import type { UploadFile, UploadResponseEvent } from '@vaadin/vaadin-upload';

/*
 * Mock XMLHttpRequest (see http://www.w3.org/TR/XMLHttpRequest)
 *
 * Written by Philipp von Weitershausen <philipp@weitershausen.de>
 * Released under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * For test interaction it exposes the following attributes:
 *
 * - method, url, urlParts, async, user, password
 * - requestText
 *
 * as well as the following methods:
 *
 * - getRequestHeader(header)
 * - setResponseHeader(header, value)
 * - receive(status, data)
 * - err(exception)
 * - authenticate(user, password)
 *
 */
type UrlParts = {
  source: string;
  protocol: string;
  authority: string;
  userInfo: string;
  user: string;
  password: string;
  host: string;
  port: string;
  relative: string;
  path: string;
  directory: string;
  file: string;
  query: string;
  anchor: string;
  queryKey: Record<string, string>;
};

const statusReasons: { [key: number]: string } = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status',
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Moved Temporarily',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Time-out',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Large',
  415: 'Unsupported Media Type',
  416: 'Requested range not satisfiable',
  417: 'Expectation Failed',
  422: 'Unprocessable Entity',
  423: 'Locked',
  424: 'Failed Dependency',
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
  505: 'HTTP Version not supported',
  507: 'Insufficient Storage',
};

export class MockHttpRequest {
  error = false;
  sent = false;
  requestHeaders: { [key: string]: string } = {};
  responseHeaders: { [key: string]: string } = {};
  statusReasons = statusReasons;

  /*** State ***/

  UNSENT = 0;
  OPENED = 1;
  HEADERS_RECEIVED = 2;
  LOADING = 3;
  DONE = 4;
  readyState = 0;

  method?: string;
  url?: string;
  async?: boolean;
  user?: string;
  password?: string;
  urlParts?: UrlParts;
  requestText?: string | null;

  /*** Request ***/

  open(method: string, url: string, async: boolean, user: string, password: string) {
    if (typeof method !== 'string') {
      throw 'INVALID_METHOD';
    }
    switch (method.toUpperCase()) {
      case 'CONNECT':
      case 'TRACE':
      case 'TRACK':
        throw 'SECURITY_ERR';

      case 'DELETE':
      case 'GET':
      case 'HEAD':
      case 'OPTIONS':
      case 'POST':
      case 'PUT':
        method = method.toUpperCase();
    }
    this.method = method;

    if (typeof url !== 'string') {
      throw 'INVALID_URL';
    }
    this.url = url;
    this.urlParts = this.parseUri(url);

    if (async === undefined) {
      async = true;
    }
    this.async = async;
    this.user = user;
    this.password = password;

    this.readyState = this.OPENED;
    this.onreadystatechange();
  }

  setRequestHeader(header: string, value: string) {
    header = header.toLowerCase();

    switch (header) {
      case 'accept-charset':
      case 'accept-encoding':
      case 'connection':
      case 'content-length':
      case 'cookie':
      case 'cookie2':
      case 'content-transfer-encoding':
      case 'date':
      case 'expect':
      case 'host':
      case 'keep-alive':
      case 'referer':
      case 'te':
      case 'trailer':
      case 'transfer-encoding':
      case 'upgrade':
      case 'user-agent':
      case 'via':
        return;
    }
    if (header.substr(0, 6) === 'proxy-' || header.substr(0, 4) === 'sec-') {
      return;
    }

    // it's the first call on this header field
    if (this.requestHeaders[header] === undefined) {
      this.requestHeaders[header] = value;
    } else {
      const prev = this.requestHeaders[header];
      this.requestHeaders[header] = prev + ', ' + value;
    }
  }

  send(data?: string | null) {
    if (this.readyState !== this.OPENED || this.sent) {
      throw 'INVALID_STATE_ERR';
    }
    if (this.method === 'GET' || this.method === 'HEAD') {
      data = null;
    }

    //TODO set Content-Type header?
    this.error = false;
    this.sent = true;
    this.onreadystatechange();

    // fake send
    this.requestText = data;
    this.onsend();
  }

  abort() {
    this.responseText = null;
    this.error = true;
    for (const header in this.requestHeaders) {
      delete this.requestHeaders[header];
    }
    delete this.requestText;
    this.onreadystatechange();
    this.onabort();
    this.readyState = this.UNSENT;
  }

  /*** Response ***/

  status = 0;
  statusText = '';

  getResponseHeader(header: string) {
    if (this.readyState === this.UNSENT || this.readyState === this.OPENED || this.error) {
      return null;
    }
    return this.responseHeaders[header.toLowerCase()];
  }

  getAllResponseHeaders() {
    let r = '';
    for (const header in this.responseHeaders) {
      if (header === 'set-cookie' || header === 'set-cookie2') {
        continue;
      }
      //TODO title case header
      r += header + ': ' + this.responseHeaders[header] + '\r\n';
    }
    return r;
  }

  responseText: string | null = '';
  responseXML = undefined; // TODO

  /*** See http://www.w3.org/TR/progress-events/ ***/

  onload() {} // Instances should override this.

  onprogress() {} // Instances should override this.

  onerror() {} // Instances should override this.

  onabort() {} // Instances should override this.

  onreadystatechange() {} // Instances should override this.

  /*** Properties and methods for test interaction ***/

  onsend() {} // Instances should override this.

  getRequestHeader(header: string) {
    return this.requestHeaders[header.toLowerCase()];
  }

  setResponseHeader(header: string, value: string) {
    this.responseHeaders[header.toLowerCase()] = value;
  }

  makeXMLResponse(data: string) {
    let xmlDoc;
    // according to specs from point 3.7.5:
    //  1. If the response entity body is null terminate these steps
    //     and return null.
    //  2. If final MIME type is not null, text/xml, application/xml,
    //     and does not end in +xml terminate these steps and return null.
    let mimetype = this.getResponseHeader('Content-Type');
    mimetype = mimetype && mimetype.split(';', 1)[0];
    if (
      mimetype == null ||
      mimetype == 'text/xml' ||
      mimetype == 'application/xml' ||
      (mimetype && mimetype.substring(mimetype.length - 4) == '+xml')
    ) {
      // Attempt to produce an xml response
      // and it will fail if not a good xml
      try {
        if (window.DOMParser) {
          const parser = new DOMParser();
          xmlDoc = parser.parseFromString(data, 'text/xml');
        } else {
          // Internet Explorer
          xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
          xmlDoc.async = 'false';
          xmlDoc.loadXML(data);
        }
      } catch (e) {
        // according to specs from point 3.7.5:
        // "3. Let document be a cookie-free Document object that
        // represents the result of parsing the response entity body
        // into a document tree following the rules from the XML
        //  specifications. If this fails (unsupported character
        // encoding, namespace well-formedness error etc.), terminate
        // these steps return null."
        xmlDoc = null;
      }
      // parse errors also yield a null.
      if (
        (xmlDoc && xmlDoc.parseError && xmlDoc.parseError.errorCode != 0) ||
        (xmlDoc && xmlDoc.documentElement && xmlDoc.documentElement.nodeName == 'parsererror') ||
        (xmlDoc &&
          xmlDoc.documentElement &&
          xmlDoc.documentElement.nodeName == 'html' &&
          xmlDoc.documentElement.firstChild &&
          xmlDoc.documentElement.firstChild.nodeName == 'body' &&
          xmlDoc.documentElement.firstChild.firstChild &&
          xmlDoc.documentElement.firstChild.firstChild.nodeName == 'parsererror')
      ) {
        xmlDoc = null;
      }
    } else {
      // mimetype is specified, but not xml-ish
      xmlDoc = null;
    }
    return xmlDoc;
  }

  // Call this to simulate a server response
  receive(status: number, data: string) {
    if (this.readyState !== this.OPENED || !this.sent) {
      // Can't respond to unopened request.
      throw 'INVALID_STATE_ERR';
    }

    this.status = status;
    this.statusText = status + ' ' + this.statusReasons[status];
    this.readyState = this.HEADERS_RECEIVED;
    this.onprogress();
    this.onreadystatechange();

    this.responseText = data;
    this.responseXML = this.makeXMLResponse(data);

    this.readyState = this.LOADING;
    this.onprogress();
    this.onreadystatechange();

    this.readyState = this.DONE;
    this.onreadystatechange();
    this.onprogress();
    this.onload();
  }

  // Call this to simulate a request error (e.g. NETWORK_ERR)
  err(exception: Error | string) {
    if (this.readyState !== this.OPENED || !this.sent) {
      // Can't respond to unopened request.
      throw 'INVALID_STATE_ERR';
    }

    this.responseText = null;
    this.error = true;
    for (const header in this.requestHeaders) {
      delete this.requestHeaders[header];
    }
    this.readyState = this.DONE;
    if (!this.async) {
      throw exception;
    }
    this.onreadystatechange();
    this.onerror();
  }

  // Convenience method to verify HTTP credentials
  authenticate(user: string, password: string) {
    if (this.user) {
      return user === this.user && password === this.password;
    }

    if (this.urlParts?.user) {
      return user === this.urlParts.user && password === this.urlParts.password;
    }

    // Basic auth. Requires existence of the 'atob' function.
    let auth = this.getRequestHeader('Authorization');
    if (auth === undefined) {
      return false;
    }
    if (auth.substr(0, 6) !== 'Basic ') {
      return false;
    }
    if (typeof atob !== 'function') {
      return false;
    }
    auth = atob(auth.substr(6));
    const pieces = auth.split(':');
    const requser = pieces.shift();
    const reqpass = pieces.join(':');
    return user === requser && password === reqpass;
  }

  // Parse RFC 3986 compliant URIs.
  // Based on parseUri by Steven Levithan <stevenlevithan.com>
  // See http://blog.stevenlevithan.com/archives/parseuri
  parseUri(str: string) {
    const pattern =
      /^(?:([^:/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:/?#]*)(?::(\d*))?))?((((?:[^?#/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/;
    const key = [
      'source',
      'protocol',
      'authority',
      'userInfo',
      'user',
      'password',
      'host',
      'port',
      'relative',
      'path',
      'directory',
      'file',
      'query',
      'anchor',
    ];
    const querypattern = /(?:^|&)([^&=]*)=?([^&]*)/g;

    const match = pattern.exec(str);
    const partialUri: Partial<UrlParts> = {};
    let i = 14;
    while (i--) {
      (partialUri as { [key: string]: string })[key[i]] = (match && match[i]) || '';
    }

    partialUri.queryKey = {};
    const uri = partialUri as UrlParts;
    uri.query.replace(querypattern, function (_, $1, $2) {
      if ($1) {
        uri.queryKey[$1] = $2;
      }
      return 'undefined';
    });

    return uri;
  }
}

/*
 * A small mock "server" that intercepts XMLHttpRequest calls and
 * diverts them to your handler.
 *
 * Usage:
 *
 * 1. Initialize with either
 *       var server = new MockHttpServer(your_request_handler);
 *    or
 *       var server = new MockHttpServer();
 *       server.handle = function (request) { ... };
 *
 * 2. Call server.start() to start intercepting all XMLHttpRequests.
 *
 * 3. Do your tests.
 *
 * 4. Call server.stop() to tear down.
 *
 * 5. Profit!
 */
export class MockHttpServer {
  handle: (request: MockHttpRequest) => void = () => {}; // Instances should override this.

  constructor(handler?: (request: MockHttpRequest) => void) {
    if (handler) {
      this.handle = handler;
    }
  }

  start() {
    const self = this; /* eslint-disable-line @typescript-eslint/no-this-alias */

    const Request = class extends MockHttpRequest {
      onsend = function (this: MockHttpRequest) {
        self.handle(this);
      };
    };

    window.OriginalHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = Request as any; /* eslint-disable-line */
  }

  stop() {
    if (window.OriginalHttpRequest) window.XMLHttpRequest = window.OriginalHttpRequest;
  }
}

// Use MockHttpRequest in demos
function mockXhrGenerator() {
  type UploadProp = {
    onloadstart?: () => void;
    onprogress?: (e: unknown) => void;
  };
  const xhr = new MockHttpRequest() as MockHttpRequest & { upload: UploadProp };
  xhr.upload = {};
  xhr.onsend = function () {
    if (xhr.upload.onloadstart) {
      xhr.upload.onloadstart();
    }
    const total = 1000 * 1000 * 5;
    let done = 0;
    function start() {
      setTimeout(progress, 1000);
    }
    function progress() {
      if (xhr.upload.onprogress) xhr.upload.onprogress({ total: total, loaded: done });
      if (done < total) {
        setTimeout(progress, 200);
        done = Math.min(total, done + 254000);
      } else {
        setTimeout(finish, 1000);
      }
    }
    function finish() {
      xhr.receive(200, '{"message":"OK"}');
    }
    start();
  };
  return xhr;
}

export function mockErrorXhrGenerator() {
  type UploadProp = {
    onloadstart?: () => void;
    onprogress?: (e: unknown) => void;
  };
  const xhr = new MockHttpRequest() as MockHttpRequest & { upload: UploadProp };
  xhr.upload = {};
  xhr.onsend = function () {
    if (xhr.upload.onloadstart) {
      xhr.upload.onloadstart();
    }

    setTimeout(() => xhr.receive(500, '{"message":"Unexpected server error"}'), 2000);
  };
  return xhr;
}

/**
 * All options:
 * {
 *   name: '',         // File name
 *   uploadTarget: '', // The target URL used to upload this file.
 *   elapsed: 0,       // Elapsed time since the upload started.
 *   elapsedStr: '',   // Human-readable elapsed time.
 *   remaining: 0,     // Number of seconds remaining for the upload to finish.
 *   remainingStr: '', // Human-readable remaining time for the upload to finish.
 *   progress: 0,      // Percentage of the file already uploaded.
 *   speed: 0,         // Upload speed in kB/s.
 *   size: 0,          // File size in bytes.
 *   totalStr: '',     // Human-readable total size of the file.
 *   loaded: 0,        // Bytes transferred so far.
 *   loadedStr: '',    // Human-readable uploaded size at the moment.
 *   status: '',       // Status of the upload process.
 *   error: '',        // Error message in case the upload failed.
 *   abort: false,     // True if the file was canceled by the user.
 *   complete: false,  // True when the file was transferred to the server.
 *   uploading: false, // True while transferring data to the server.
 * }
 */
export function createFakeUploadFile(
  options: Partial<UploadFile> & { name: string; held?: boolean }
): UploadFile {
  const { name, ...uploadFileProps } = options;
  const file = new File([], name) as UploadFile;
  Object.assign(file, uploadFileProps);
  return file;
}

export function createFakeUploadFiles(
  options: Array<Partial<UploadFile> & { name: string; held?: boolean }>
): UploadFile[] {
  return options.map((o) => createFakeUploadFile(o));
}

export function fakeErrorResponse(event: UploadResponseEvent) {
  (event.detail.xhr.status as any) = 500;
}

export function fakeErrorResponseWrapper(callback: (event: UploadResponseEvent) => void) {
  return (event: UploadResponseEvent) => {
    fakeErrorResponse(event);
    callback(event);
  };
}

window.customElements.whenDefined('vaadin-upload').then(() => {
  // Monkey-patch vaadin-upload prototype to use MockHttpRequest
  Object.getPrototypeOf(document.createElement('vaadin-upload'))._createXhr = mockXhrGenerator;
});

declare global {
  interface Window {
    OriginalHttpRequest?: typeof XMLHttpRequest;
  }
}

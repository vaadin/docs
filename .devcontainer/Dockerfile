FROM mcr.microsoft.com/devcontainers/base:ubuntu

ARG TZ=Europe/Helsinki
ENV TZ=${TZ}


# Install vale
ARG VALE_VERSION=3.9.4
ARG TARGETARCH
RUN case "${TARGETARCH}" in \
        amd64) VALE_ARCH="64-bit" ;; \
        arm64) VALE_ARCH="arm64" ;; \
        *) echo "Unsupported architecture: ${TARGETARCH}" && exit 1 ;; \
    esac && \
    curl -sfL "https://github.com/errata-ai/vale/releases/download/v${VALE_VERSION}/vale_${VALE_VERSION}_Linux_${VALE_ARCH}.tar.gz" \
    | tar -xz -C /usr/local/bin vale

# Install asciidoctor
RUN apt-get update && apt-get install -y --no-install-recommends \
    asciidoctor \
    && apt-get clean

# Create workspace and config directories and set permissions
RUN mkdir -p /workspace /home/vscode/.claude /home/vscode/.m2 /commandhistory && \
    chown -R vscode:vscode /workspace /home/vscode/.claude /home/vscode/.m2 /commandhistory

WORKDIR /workspace

# Set up non-root user
USER vscode

# Install Claude
ENV PATH=$PATH:/home/vscode/.local/bin
RUN curl -fsSL https://claude.ai/install.sh | bash

# Configure history
RUN echo 'HISTFILE=/commandhistory/.zsh_history' >> /home/vscode/.zshrc \
    && echo 'HISTFILE=/commandhistory/.bash_history' >> /home/vscode/.bashrc

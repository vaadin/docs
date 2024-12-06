// This module should export all mock services used in live examples
// During the build, the `Frontend/generated/endpoints` import is replaced with this module
import DashboardService from 'Frontend/demo/services/DashboardService';
import EmployeeService from 'Frontend/demo/services/EmployeeService';
import ProductService from 'Frontend/demo/services/ProductService';
export * from 'Frontend/generated/endpoints.js';

export { DashboardService, EmployeeService, ProductService };

import { DocumentService } from './index';

const context = require.context('./services', true, /index.ts$/);

console.log(context.keys());

const services: ServiceMeta[] = context
  .keys()
  .filter(key => key !== './index.ts')
  .map(key => {
    return context(key).default;
  });

interface ServiceMeta {
  name: string;
  icon: string;
  type: string;
  service: DocumentService;
  form: any;
}

export default services;

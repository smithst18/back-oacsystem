import { Server } from 'http';

declare global {
  namespace Express {
    interface Request {
      headers: { [key: string]: string };
      user?: any; // Optional user property (as discussed previously)
      // ... other request properties
    }
    interface Response {
      send(data: any): Response;
      // ... other response methods
    }
    interface NextFunction {
      (): void;
    }
    interface Application {
      get(path: string, handler: (...args: any[]) => void): Application;
      post(path: string, handler: (...args: any[]) => void): Application;
      // ... other application methods
    }
  }
}

export = Express;
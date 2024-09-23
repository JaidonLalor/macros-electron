// @/electron.d.ts
export interface ElectronAPI {
    insertRecord: (table: string, data: any) => Promise<any>;
    query: (sql: string, params?: any[]) => Promise<any>;
    updateRecord: (table: string, data: any, where: any) => Promise<any>;
    deleteRecord: (table: string, where: any) => Promise<any>;
    quit: () => void;
  }
  
  declare global {
    interface Window {
      electronAPI: ElectronAPI;
    }
  }
  
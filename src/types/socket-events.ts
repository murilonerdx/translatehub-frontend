export enum SocketEvents {
  // Server -> Client events
  INITIAL_DOCUMENTS = 'documents:initial',
  DOCUMENT_UPDATE = 'document:update',
  DOCUMENT_DELETE = 'document:delete',
  
  // Client -> Server events
  REQUEST_DOCUMENTS = 'documents:request',
}
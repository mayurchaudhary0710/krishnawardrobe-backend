import { AuditFieldsDTO } from './common.dtos';

export interface EmailContent {
  subject: string;
  text?: string;
  html?: string;
}

export interface EmailContacts {
  to: string[];
  from: string;
}

export type EmailDTO = {
  to: string[];
  bcc?: string[];
  attachments?: EmailAttachments[];
  content: EmailContent;
};

export interface EmailTokenDTO extends AuditFieldsDTO {
  userId: string;
  jwtToken: string;
  isVerified: boolean;
  expiresAt: Date;
}

export interface EmailAttachments {
  filename: string;
  path?: string;
  contentType?: string;
  content?: any;
  encoding?: string;
}

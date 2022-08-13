export interface RequestLog {
  url: string;
  retry?: 'Y' | 'N';
  timestamp: string;
}

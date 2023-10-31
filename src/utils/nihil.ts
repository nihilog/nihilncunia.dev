import { v4 as uuid } from 'uuid';

export class Nihil {
  constructor() {
    // 여기에 초기화
  }

  static string(data: any) {
    return JSON.stringify(data);
  }

  static uuid() {
    return uuid();
  }
}

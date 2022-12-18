export default class Task {
  constructor(title, content){
      this.id = crypto.randomUUID();
      this.title = title;
      this.content = content;
    }
}
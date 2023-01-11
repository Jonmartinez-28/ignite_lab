export class Content {
  private readonly content: string;

  get value(): string {
    return this.content;
  }

  private validateContentlenght(content: string): boolean {
    return content.length >= 5 && content.length <= 240;
  }

  constructor(content: string) {
    const isContentLenght = this.validateContentlenght(content);

    if (!isContentLenght) {
      throw new Error("content lenght error.");
    }

    this.content = content;
  }
}

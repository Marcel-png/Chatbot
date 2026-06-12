export interface Message {
  sender: "user" | "bot";
  text: string;
  id: string;
}

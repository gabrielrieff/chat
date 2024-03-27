export type Connection = {
  id?: string;
  phone?: string;
  name?: string;
  photo?: null | string;
  isUser?: false | true;
  created_at?: string;
  update_at?: string;
  userId?: string;
  conversationId?: null | string;
};

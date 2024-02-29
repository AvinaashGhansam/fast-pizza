export interface CartType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
// TODO: GET RID OF UNIT PRICE, IT IS NOT COMPUTED BEING IT COMES FROM THE API

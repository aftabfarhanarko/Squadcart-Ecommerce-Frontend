import { gql } from "@apollo/client";

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCart($documentId: ID!, $data: CartInput!) {
    updateCart(documentId: $documentId, data: $data) {
      cart_products {
        product_quantity
      }
    }
  }
`;

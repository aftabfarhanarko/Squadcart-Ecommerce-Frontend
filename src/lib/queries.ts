import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
  query Query($pagination: PaginationArg) {
    products(pagination: $pagination) {
      title
      documentId
      off
      SKU
      reviews {
        rating
      }
      images {
        name
        url
      }
      variant {
        price
        size
        available_quantity
        stock_status
      }
    }
  }
`;
export const GET_PRODUCT = gql`
  query Product($documentId: ID!) {
    product(documentId: $documentId) {
      documentId
      SKU
      title
      total_sale
      off
      description {
        summary
        id
        list_items {
          title
          id
          list {
            id
            item
          }
        }
      }
      categories {
        name
        slug
      }
      images {
        name
        url
      }
      reviews {
        documentId
        rating
        review
        users_permissions_user {
          username
        }
        date
      }
      variant {
        id
        price
        available_quantity
        size
        stock_status
      }
    }
  }
`;
export const GET_RELATED_PRODUCTS = gql`
  query Product($documentId: ID!, $pagination: PaginationArg) {
    product(documentId: $documentId) {
      categories {
        products(pagination: $pagination) {
          title
          documentId
          off
          SKU
          reviews {
            rating
          }
          images {
            name
            url
          }
          variant {
            price
          }
        }
      }
    }
  }
`;

export const GET_BANNERS = gql`
  query Banners {
    banners {
      name
      slug
      documentId
      banner_image {
        url
        documentId
      }
    }
  }
`;
export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      documentId
      name
      slug
      image {
        name
        url
      }
    }
  }
`;

export const GET_TRENDING_PRODUCTS = gql`
  query Products($pagination: PaginationArg, $filters: ProductFiltersInput) {
    products(pagination: $pagination, filters: $filters) {
      documentId
      title
      SKU
      off
      reviews {
        rating
      }
      images {
        name
        url
      }
      variant {
        price
        size
        available_quantity
        stock_status
      }
    }
  }
`;
export const GET_FLASH_SALE_PRODUCTS = gql`
  query Products($pagination: PaginationArg, $filters: ProductFiltersInput) {
    products(pagination: $pagination, filters: $filters) {
      documentId
      SKU
      title
      off
      reviews {
        rating
      }
      images {
        name
        url
      }
      variant {
        price
        size
        available_quantity
        stock_status
      }
    }
  }
`;
export const GET_FLASH_SALE_INFO = gql`
  query FlashSaleInfos(
    $filters: FlashSaleInfoFiltersInput
    $pagination: PaginationArg
  ) {
    flashSaleInfos(filters: $filters, pagination: $pagination) {
      documentId
      off
      isOpenFlashSale
      time_duration_hour
      background_image {
        name
        url
      }
    }
  }
`;

export const GET_CARTS = gql`
  query Carts($filters: CartFiltersInput) {
    carts(filters: $filters) {
      documentId
      slug
      cart_products {
        id
        price
        size
        product_quantity
        product {
          documentId
          title
          images {
            name
            url
          }
        }
      }
    }
  }
`;

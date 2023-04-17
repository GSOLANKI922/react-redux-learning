import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query Products($pagination: PaginationArg) {
    products(pagination: $pagination) {
      data {
        id
        attributes {
          description
          name
          price
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
      meta {
        pagination {
          page
          pageSize
          total
        }
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProductByID($productId: ID) {
    product(id: $productId) {
      data {
        id
        attributes {
          name
          price
          description
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query category {
    categories {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_CATEGORIES = gql`
query Category($categoryId: ID) {
  category(id: $categoryId) {
    data {
      id
      attributes {
        products {
          data {
            id
            attributes {
              description
              name
              price
              images {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  products {
    meta {
      pagination {
        pageSize
      }
    }
  }
}
`;

export const SEARCH_PRODUCT = gql`
query Products($filters: ProductFiltersInput, $pagination: PaginationArg) {
  products(filters: $filters, pagination: $pagination) {
    data {
      id
      attributes {
        name
      }
    }
    meta {
      pagination {
        pageSize
      }
    }
  }
}
`
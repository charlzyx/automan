import { paths } from "./petstoreDTS";
import { AxiosRequestConfig, request } from "@/app/request";
type PickRsp<T> = T extends { 200: { schema: infer R } } ? R : unknown;
type PickBody<T> = T extends Record<string, infer U> ? U : T;

/** Everything about your Pets */
export const everythingaboutyourPets = {
  /** uploads an image  */
  postPetByPetIdUploadImage(
    data: paths["/pet/{petId}/uploadImage"]["post"]["parameters"]["formData"] &
      paths["/pet/{petId}/uploadImage"]["post"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.post(`/petstore/pet/${data.petId}/uploadImage`, {
      data,

      ...(config || {}),
    }) as Promise<
      PickRsp<paths["/pet/{petId}/uploadImage"]["post"]["responses"]>
    >;
  },
  /** Add a new pet to the store  */
  postPet(
    data: PickBody<paths["/pet"]["post"]["parameters"]["body"]>,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.post(`/petstore/pet`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/pet"]["post"]["responses"]>>;
  },
  /** Update an existing pet  */
  putPet(
    data: PickBody<paths["/pet"]["put"]["parameters"]["body"]>,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.put(`/petstore/pet`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/pet"]["put"]["responses"]>>;
  },
  /** Finds Pets by status Multiple status values can be provided with comma separated strings */
  getPetFindByStatus(
    data: paths["/pet/findByStatus"]["get"]["parameters"]["query"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/pet/findByStatus`, {
      params: data,
      ...(config || {}),
    }) as Promise<PickRsp<paths["/pet/findByStatus"]["get"]["responses"]>>;
  },
  /** Finds Pets by tags Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing. */
  getPetFindByTags(
    data: paths["/pet/findByTags"]["get"]["parameters"]["query"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/pet/findByTags`, {
      params: data,
      ...(config || {}),
    }) as Promise<PickRsp<paths["/pet/findByTags"]["get"]["responses"]>>;
  },
  /** Find pet by ID Returns a single pet */
  getPetByPetId(
    data: paths["/pet/{petId}"]["get"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/pet/${data.petId}`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/pet/{petId}"]["get"]["responses"]>>;
  },
  /** Updates a pet in the store with form data  */
  postPetByPetId(
    data: paths["/pet/{petId}"]["post"]["parameters"]["formData"] &
      paths["/pet/{petId}"]["post"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.post(`/petstore/pet/${data.petId}`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/pet/{petId}"]["post"]["responses"]>>;
  },
  /** Deletes a pet  */
  deletePetByPetId(
    data: paths["/pet/{petId}"]["delete"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.delete(`/petstore/pet/${data.petId}`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/pet/{petId}"]["delete"]["responses"]>>;
  },
};
/** Access to Petstore orders */
export const accesstoPetstoreorders = {
  /** Returns pet inventories by status Returns a map of status codes to quantities */
  getInventory(
    _useless?: any,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/store/inventory`, {
      ...(config || {}),
    }) as Promise<PickRsp<paths["/store/inventory"]["get"]["responses"]>>;
  },
  /** Place an order for a pet  */
  postOrder(
    data: PickBody<paths["/store/order"]["post"]["parameters"]["body"]>,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.post(`/petstore/store/order`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/store/order"]["post"]["responses"]>>;
  },
  /** Find purchase order by ID For valid response try integer IDs with value >= 1 and <= 10. Other values will generated exceptions */
  getOrderByOrderId(
    data: paths["/store/order/{orderId}"]["get"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/store/order/${data.orderId}`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/store/order/{orderId}"]["get"]["responses"]>>;
  },
  /** Delete purchase order by ID For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors */
  deleteOrderByOrderId(
    data: paths["/store/order/{orderId}"]["delete"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.delete(`/petstore/store/order/${data.orderId}`, {
      data,

      ...(config || {}),
    }) as Promise<
      PickRsp<paths["/store/order/{orderId}"]["delete"]["responses"]>
    >;
  },
};
/** Operations about user */
export const operationsaboutuser = {
  /** Creates list of users with given input array  */
  postUserCreateWithList(
    data: PickBody<paths["/user/createWithList"]["post"]["parameters"]["body"]>,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.post(`/petstore/user/createWithList`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/user/createWithList"]["post"]["responses"]>>;
  },
  /** Get user by user name  */
  getUserByUsername(
    data: paths["/user/{username}"]["get"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/user/${data.username}`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/user/{username}"]["get"]["responses"]>>;
  },
  /** Updated user This can only be done by the logged in user. */
  putUserByUsername(
    data: PickBody<paths["/user/{username}"]["put"]["parameters"]["body"]> &
      paths["/user/{username}"]["put"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.put(`/petstore/user/${data.username}`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/user/{username}"]["put"]["responses"]>>;
  },
  /** Delete user This can only be done by the logged in user. */
  deleteUserByUsername(
    data: paths["/user/{username}"]["delete"]["parameters"]["path"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.delete(`/petstore/user/${data.username}`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/user/{username}"]["delete"]["responses"]>>;
  },
  /** Logs user into the system  */
  getUserLogin(
    data: paths["/user/login"]["get"]["parameters"]["query"],
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/user/login`, {
      params: data,
      ...(config || {}),
    }) as Promise<PickRsp<paths["/user/login"]["get"]["responses"]>>;
  },
  /** Logs out current logged in user session  */
  getUserLogout(
    _useless?: any,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.get(`/petstore/user/logout`, {
      ...(config || {}),
    }) as Promise<PickRsp<paths["/user/logout"]["get"]["responses"]>>;
  },
  /** Creates list of users with given input array  */
  postUserCreateWithArray(
    data: PickBody<
      paths["/user/createWithArray"]["post"]["parameters"]["body"]
    >,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.post(`/petstore/user/createWithArray`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/user/createWithArray"]["post"]["responses"]>>;
  },
  /** Create user This can only be done by the logged in user. */
  postUser(
    data: PickBody<paths["/user"]["post"]["parameters"]["body"]>,
    config?: Omit<AxiosRequestConfig, "data" | "params">,
  ) {
    return request.post(`/petstore/user`, {
      data,

      ...(config || {}),
    }) as Promise<PickRsp<paths["/user"]["post"]["responses"]>>;
  },
};

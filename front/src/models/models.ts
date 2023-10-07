export type Customer = {
    _id: string,
    name: string,
    email: string
}

export type Product = {
    name: string,
    desc: string,
    unit: number,
    price: number,
    available: boolean,
    suplier: string,
    image: string
}

export type ApiResponse = {
    message?: string,
    data: any
}
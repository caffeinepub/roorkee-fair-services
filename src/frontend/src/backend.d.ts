import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export type Time = bigint;
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface ServiceBooking {
    serviceName: string;
    area: string;
    name: string;
    timestamp: Time;
    phone: string;
}
export interface BrightBlueElectrical {
    name: string;
    description: string;
    rating: number;
}
export interface Review {
    id: bigint;
    serviceName: string;
    reviewerName: string;
    comment: string;
    timestamp: Time;
    rating: bigint;
}
export interface http_header {
    value: string;
    name: string;
}
export interface backendInterface {
    bookService(name: string, phone: string, area: string, serviceName: string): Promise<bigint>;
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllReviews(): Promise<Array<Review>>;
    getAllServiceBookings(): Promise<Array<ServiceBooking>>;
    getBookingsByPhone(phone: string): Promise<Array<ServiceBooking>>;
    getBrightBlueElectrical(): Promise<BrightBlueElectrical>;
    submitContactForm(formId: string, name: string, email: string, message: string): Promise<void>;
    submitReview(reviewerName: string, rating: bigint, comment: string, serviceName: string): Promise<bigint>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}

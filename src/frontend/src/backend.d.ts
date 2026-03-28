import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServiceBooking {
    serviceName: string;
    area: string;
    name: string;
    timestamp: Time;
    phone: string;
}
export interface EventListing {
    date: string;
    name: string;
    description: string;
    imageUrl: string;
    location: string;
}
export type Time = bigint;
export interface VendorListing {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    rating: bigint;
}
export interface ServiceListing {
    icon: string;
    name: string;
    description: string;
}
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface backendInterface {
    addEventListing(name: string, description: string, date: string, location: string, imageUrl: string): Promise<void>;
    addServiceListing(name: string, description: string, icon: string): Promise<void>;
    addVendorListing(name: string, category: string, description: string, rating: bigint, imageUrl: string): Promise<void>;
    bookService(name: string, phone: string, area: string, serviceName: string): Promise<bigint>;
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllEventListings(): Promise<Array<EventListing>>;
    getAllServiceBookings(): Promise<Array<ServiceBooking>>;
    getAllServiceListings(): Promise<Array<ServiceListing>>;
    getAllVendorListings(): Promise<Array<VendorListing>>;
    getBookingsByPhone(phone: string): Promise<Array<ServiceBooking>>;
    getBookingsByService(serviceName: string): Promise<Array<ServiceBooking>>;
    getContactForm(formId: string): Promise<ContactForm>;
    getEventListing(name: string): Promise<EventListing>;
    getFutureEvents(): Promise<Array<EventListing>>;
    getServiceBooking(bookingId: bigint): Promise<ServiceBooking>;
    getServiceListing(name: string): Promise<ServiceListing>;
    getVendorListing(name: string): Promise<VendorListing>;
    getVendorsByCategory(category: string): Promise<Array<VendorListing>>;
    submitContactForm(formId: string, name: string, email: string, message: string): Promise<void>;
}

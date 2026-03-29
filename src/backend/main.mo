import Map "mo:core/Map";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";

actor {
  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  type ServiceBooking = {
    name : Text;
    phone : Text;
    area : Text;
    serviceName : Text;
    timestamp : Time.Time;
  };

  type ServiceListing = {
    name : Text;
    description : Text;
    icon : Text;
  };

  type EventListing = {
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
  };

  type VendorListing = {
    name : Text;
    category : Text;
    description : Text;
    rating : Nat;
    imageUrl : Text;
  };

  type Review = {
    id : Nat;
    reviewerName : Text;
    rating : Nat;
    comment : Text;
    serviceName : Text;
    timestamp : Time.Time;
  };

  module ServiceListing {
    public func compare(s1 : ServiceListing, s2 : ServiceListing) : Order.Order {
      Text.compare(s1.name, s2.name);
    };
  };

  module EventListing {
    public func compare(e1 : EventListing, e2 : EventListing) : Order.Order {
      Text.compare(e1.name, e2.name);
    };
  };

  module VendorListing {
    public func compare(v1 : VendorListing, v2 : VendorListing) : Order.Order {
      Text.compare(v1.name, v2.name);
    };
  };

  // Preserved stable variables from previous version
  let contactForms = Map.empty<Text, ContactForm>();
  let serviceBookings = Map.empty<Nat, ServiceBooking>();
  let serviceListings = Map.empty<Text, ServiceListing>();
  let eventListings = Map.empty<Text, EventListing>();
  let vendorListings = Map.empty<Text, VendorListing>();
  let reviews = Map.empty<Nat, Review>();
  var nextBookingId = 1;
  var nextReviewId = 1;

  let dayInMillis = 86400000000000;
  let nextYearMillis = 365 * dayInMillis;

  let sampleServices : [(Text, ServiceListing)] = [];
  let sampleEvents : [(Text, EventListing)] = [];
  let sampleVendors : [(Text, VendorListing)] = [];

  // Service bookings
  public shared func bookService(name : Text, phone : Text, area : Text, serviceName : Text) : async Nat {
    let bookingId = nextBookingId;
    let booking : ServiceBooking = {
      name;
      phone;
      area;
      serviceName;
      timestamp = Time.now();
    };
    serviceBookings.add(bookingId, booking);
    nextBookingId += 1;
    bookingId;
  };

  public query func getAllServiceBookings() : async [ServiceBooking] {
    serviceBookings.values().toArray();
  };

  public query func getBookingsByPhone(phone : Text) : async [ServiceBooking] {
    serviceBookings.values().toArray().filter(
      func(b : ServiceBooking) : Bool { b.phone == phone }
    );
  };

  // Reviews
  public shared func submitReview(reviewerName : Text, rating : Nat, comment : Text, serviceName : Text) : async Nat {
    let reviewId = nextReviewId;
    let review : Review = {
      id = reviewId;
      reviewerName;
      rating;
      comment;
      serviceName;
      timestamp = Time.now();
    };
    reviews.add(reviewId, review);
    nextReviewId += 1;
    reviewId;
  };

  public query func getAllReviews() : async [Review] {
    reviews.values().toArray();
  };

  // Contact form (preserved)
  public shared func submitContactForm(formId : Text, name : Text, email : Text, message : Text) : async () {
    contactForms.add(formId, { name; email; message });
  };

  public query func getAllContactForms() : async [ContactForm] {
    contactForms.values().toArray();
  };
};

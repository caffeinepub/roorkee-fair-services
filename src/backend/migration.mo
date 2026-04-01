import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
  type OldContactForm = {
    name : Text;
    email : Text;
    message : Text;
  };

  type OldServiceBooking = {
    name : Text;
    phone : Text;
    area : Text;
    serviceName : Text;
    timestamp : Time.Time;
  };

  type OldServiceListing = {
    name : Text;
    description : Text;
    icon : Text;
  };

  type OldEventListing = {
    name : Text;
    description : Text;
    date : Text;
    location : Text;
    imageUrl : Text;
  };

  type OldVendorListing = {
    name : Text;
    category : Text;
    description : Text;
    rating : Nat;
    imageUrl : Text;
  };

  type OldReview = {
    id : Nat;
    reviewerName : Text;
    rating : Nat;
    comment : Text;
    serviceName : Text;
    timestamp : Time.Time;
  };

  type OldActor = {
    contactForms : Map.Map<Text, OldContactForm>;
    serviceBookings : Map.Map<Nat, OldServiceBooking>;
    serviceListings : Map.Map<Text, OldServiceListing>;
    eventListings : Map.Map<Text, OldEventListing>;
    vendorListings : Map.Map<Text, OldVendorListing>;
    reviews : Map.Map<Nat, OldReview>;
    nextBookingId : Nat;
    nextReviewId : Nat;
  };

  type NewActor = OldActor;

  public func run(old : OldActor) : NewActor {
    old;
  };
};

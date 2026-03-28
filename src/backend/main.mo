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

  module ServiceListing {
    public func compare(service1 : ServiceListing, service2 : ServiceListing) : Order.Order {
      Text.compare(service1.name, service2.name);
    };
  };

  module EventListing {
    public func compare(event1 : EventListing, event2 : EventListing) : Order.Order {
      Text.compare(event1.name, event2.name);
    };
  };

  module VendorListing {
    public func compare(vendor1 : VendorListing, vendor2 : VendorListing) : Order.Order {
      Text.compare(vendor1.name, vendor2.name);
    };
  };

  let contactForms = Map.empty<Text, ContactForm>();
  let serviceBookings = Map.empty<Nat, ServiceBooking>();
  let serviceListings = Map.empty<Text, ServiceListing>();
  let eventListings = Map.empty<Text, EventListing>();
  let vendorListings = Map.empty<Text, VendorListing>();
  var nextBookingId = 1;

  // Pre-populate with sample data for Roorkee fair context
  let dayInMillis = 86400000000000;
  let nextYearMillis = 365 * dayInMillis;

  // Add sample service listings
  let sampleServices : [(Text, ServiceListing)] = [
    (
      "foodStalls",
      {
        name = "Food Stalls";
        description = "Variety of local and international cuisines.";
        icon = "🍔";
      },
    ),
    (
      "rides",
      {
        name = "Rides";
        description = "Fun rides for all ages.";
        icon = "🎢";
      },
    ),
    (
      "crafts",
      {
        name = "Crafts";
        description = "Handmade crafts and souvenirs.";
        icon = "🧵";
      },
    ),
    (
      "games",
      {
        name = "Games and Activities";
        description = "Exciting games and interactive activities for families and children.";
        icon = "🎮";
      },
    ),
    (
      "stagePerformances",
      {
        name = "Stage Performances";
        description = "Live music, dance, and entertainment shows.";
        icon = "🎤";
      },
    ),
    (
      "workshops",
      {
        name = "Workshops";
        description = "Educational workshops and demonstrations.";
        icon = "🔨";
      },
    ),
    (
      "securityServices",
      {
        name = "Security Services";
        description = "Safety and security services for fairgoers.";
        icon = "🛡️";
      },
    ),
    (
      "transportation",
      {
        name = "Transportation Services";
        description = "Convenient transportation options for attendees.";
        icon = "🚗";
      },
    ),
  ];

  sampleServices.forEach(
    func((_, service)) {
      serviceListings.add(service.name, service);
    }
  );

  // Add sample event listings with future dates
  let sampleEvents : [(Text, EventListing)] = [
    (
      "roorkeeFoodFestival",
      {
        name = "Roorkee Food Festival";
        description = "A festival celebrating local cuisine and international flavors.";
        date = "2024-08-15";
        location = "Central Park, Roorkee";
        imageUrl = "https://example.com/food-festival.jpg";
      },
    ),
    (
      "summerFair",
      {
        name = "Summer Fair";
        description = "Annual summer fair with rides, games, and entertainment.";
        date = "2024-07-20";
        location = "Roorkee Fairgrounds";
        imageUrl = "https://example.com/summer-fair.jpg";
      },
    ),
    (
      "craftsExpo",
      {
        name = "Crafts Expo";
        description = "Showcase of handmade crafts and art.";
        date = "2024-09-05";
        location = "Exhibition Hall, Roorkee";
        imageUrl = "https://example.com/crafts-expo.jpg";
      },
    ),
    (
      "musicConcert",
      {
        name = "Music Concert";
        description = "Live music performances by local and national artists.";
        date = "2024-10-10";
        location = "Roorkee Arena";
        imageUrl = "https://example.com/music-concert.jpg";
      },
    ),
    (
      "charityFair",
      {
        name = "Charity Fair";
        description = "Fundraising fair for local charities and organizations.";
        date = "2024-11-15";
        location = "Community Center";
        imageUrl = "https://example.com/charity-fair.jpg";
      },
    ),
    (
      "technologyExpo",
      {
        name = "Technology Expo";
        description = "Showcase of the latest technological advancements and innovations.";
        date = "2024-12-01";
        location = "Roorkee Tech Park";
        imageUrl = "https://example.com/technology-expo.jpg";
      },
    ),
  ];

  sampleEvents.forEach(
    func((_, event)) {
      eventListings.add(event.name, event);
    }
  );

  // Add sample vendor listings
  let sampleVendors : [(Text, VendorListing)] = [
    (
      "sunshineCatering",
      {
        name = "Sunshine Catering";
        category = "Food";
        description = "Delicious catering services for events and fairs.";
        rating = 5;
        imageUrl = "https://example.com/sunshine-catering.jpg";
      },
    ),
    (
      "thrillRides",
      {
        name = "Thrill Rides";
        category = "Rides";
        description = "Exciting rides and attractions for all ages.";
        rating = 4;
        imageUrl = "https://example.com/thrill-rides.jpg";
      },
    ),
    (
      "craftyHands",
      {
        name = "Crafty Hands";
        category = "Crafts";
        description = "Handcrafted souvenirs and gift items.";
        rating = 5;
        imageUrl = "https://example.com/crafty-hands.jpg";
      },
    ),
    (
      "gameZone",
      {
        name = "Game Zone";
        category = "Games";
        description = "Interactive games and gaming services.";
        rating = 4;
        imageUrl = "https://example.com/game-zone.jpg";
      },
    ),
    (
      "dynamicSecurity",
      {
        name = "Dynamic Security";
        category = "Security";
        description = "Professional security services for events.";
        rating = 5;
        imageUrl = "https://example.com/dynamic-security.jpg";
      },
    ),
    (
      "stageMasters",
      {
        name = "Stage Masters";
        category = "Performances";
        description = "Organizing and managing stage shows and performances.";
        rating = 4;
        imageUrl = "https://example.com/stage-masters.jpg";
      },
    ),
    (
      "travelEasy",
      {
        name = "Travel Easy";
        category = "Transportation";
        description = "Reliable transportation services for fair attendees.";
        rating = 5;
        imageUrl = "https://example.com/travel-easy.jpg";
      },
    ),
  ];

  sampleVendors.forEach(
    func((_, vendor)) {
      vendorListings.add(vendor.name, vendor);
    }
  );

  // Contact form submissions
  public shared ({ caller }) func submitContactForm(formId : Text, name : Text, email : Text, message : Text) : async () {
    let contactForm : ContactForm = {
      name;
      email;
      message;
    };
    contactForms.add(formId, contactForm);
  };

  public query ({ caller }) func getContactForm(formId : Text) : async ContactForm {
    switch (contactForms.get(formId)) {
      case (null) { Runtime.trap("Contact form does not exist") };
      case (?contactForm) { contactForm };
    };
  };

  public query ({ caller }) func getAllContactForms() : async [ContactForm] {
    contactForms.values().toArray();
  };

  // Service bookings
  public shared ({ caller }) func bookService(name : Text, phone : Text, area : Text, serviceName : Text) : async Nat {
    let booking : ServiceBooking = {
      name;
      phone;
      area;
      serviceName;
      timestamp = Time.now();
    };
    let bookingId = nextBookingId;
    serviceBookings.add(bookingId, booking);
    nextBookingId += 1;
    bookingId;
  };

  public query ({ caller }) func getServiceBooking(bookingId : Nat) : async ServiceBooking {
    switch (serviceBookings.get(bookingId)) {
      case (null) { Runtime.trap("Service booking does not exist") };
      case (?booking) { booking };
    };
  };

  public query ({ caller }) func getAllServiceBookings() : async [ServiceBooking] {
    serviceBookings.values().toArray();
  };

  public query ({ caller }) func getBookingsByPhone(phone : Text) : async [ServiceBooking] {
    let filteredBookings = serviceBookings.values().toArray().filter(
      func(booking) {
        booking.phone == phone;
      }
    );
    filteredBookings;
  };

  public query ({ caller }) func getBookingsByService(serviceName : Text) : async [ServiceBooking] {
    let filteredBookings = serviceBookings.values().toArray().filter(
      func(booking) {
        booking.serviceName == serviceName;
      }
    );
    filteredBookings;
  };

  // Service listings
  public shared ({ caller }) func addServiceListing(name : Text, description : Text, icon : Text) : async () {
    let serviceListing : ServiceListing = {
      name;
      description;
      icon;
    };
    serviceListings.add(name, serviceListing);
  };

  public query ({ caller }) func getServiceListing(name : Text) : async ServiceListing {
    switch (serviceListings.get(name)) {
      case (null) { Runtime.trap("Service listing does not exist") };
      case (?serviceListing) { serviceListing };
    };
  };

  public query ({ caller }) func getAllServiceListings() : async [ServiceListing] {
    serviceListings.values().toArray().sort();
  };

  // Event listings
  public shared ({ caller }) func addEventListing(name : Text, description : Text, date : Text, location : Text, imageUrl : Text) : async () {
    let eventListing : EventListing = {
      name;
      description;
      date;
      location;
      imageUrl;
    };
    eventListings.add(name, eventListing);
  };

  public query ({ caller }) func getEventListing(name : Text) : async EventListing {
    switch (eventListings.get(name)) {
      case (null) { Runtime.trap("Event listing does not exist") };
      case (?eventListing) { eventListing };
    };
  };

  public query ({ caller }) func getAllEventListings() : async [EventListing] {
    eventListings.values().toArray().sort();
  };

  public query ({ caller }) func getFutureEvents() : async [EventListing] {
    let now = Time.now();
    let futureEvents = eventListings.values().toArray().filter(
      func(event) {
        // Assume date is stored as "YYYY-MM-DD" and convert to Timestamp
        let eventTimestamp = toTimestamp(event.date);
        eventTimestamp > now;
      }
    );
    futureEvents.sort();
  };

  func toTimestamp(date : Text) : Time.Time {
    let parts = date.split(#char '-').toArray();
    if (parts.size() != 3) { return 0 };
    let year = switch (Nat.fromText(parts[0])) {
      case (?y) { y };
      case (null) { return 0 };
    };
    let month = switch (Nat.fromText(parts[1])) {
      case (?m) { m };
      case (null) { return 0 };
    };
    let day = switch (Nat.fromText(parts[2])) {
      case (?d) { d };
      case (null) { return 0 };
    };
    // Calculate timestamp (simplified)
    let currentYear = 2024;
    let currentMonth = 6;
    let currentDay = 1;
    let yearDiff = if (year >= currentYear) { year - currentYear } else { 0 };
    let monthDiff = if (month >= currentMonth) { month - currentMonth } else { 0 };
    let dayDiff = if (day >= currentDay) { day - currentDay } else { 0 };
    let totalDays = yearDiff * 365 + monthDiff * 30 + dayDiff;
    let dayInNanos = 86400000000000;
    Time.now() + (totalDays * dayInNanos);
  };

  // Vendor listings
  public shared ({ caller }) func addVendorListing(name : Text, category : Text, description : Text, rating : Nat, imageUrl : Text) : async () {
    let vendorListing : VendorListing = {
      name;
      category;
      description;
      rating;
      imageUrl;
    };
    vendorListings.add(name, vendorListing);
  };

  public query ({ caller }) func getVendorListing(name : Text) : async VendorListing {
    switch (vendorListings.get(name)) {
      case (null) { Runtime.trap("Vendor listing does not exist") };
      case (?vendorListing) { vendorListing };
    };
  };

  public query ({ caller }) func getAllVendorListings() : async [VendorListing] {
    vendorListings.values().toArray().sort();
  };

  public query ({ caller }) func getVendorsByCategory(category : Text) : async [VendorListing] {
    let filteredVendors = vendorListings.values().toArray().filter(
      func(vendor) {
        vendor.category == category;
      }
    );
    filteredVendors.sort();
  };
};

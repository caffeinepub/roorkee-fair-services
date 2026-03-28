import { useMutation, useQuery } from "@tanstack/react-query";
import type { EventListing, ServiceListing, VendorListing } from "../backend.d";
import { useActor } from "./useActor";

export function useGetServices() {
  const { actor, isFetching } = useActor();
  return useQuery<ServiceListing[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServiceListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetEvents() {
  const { actor, isFetching } = useActor();
  return useQuery<EventListing[]>({
    queryKey: ["events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllEventListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetVendors() {
  const { actor, isFetching } = useActor();
  return useQuery<VendorListing[]>({
    queryKey: ["vendors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllVendorListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const formId = `contact_${Date.now()}`;
      await actor.submitContactForm(
        formId,
        data.name,
        data.email,
        data.message,
      );
    },
  });
}

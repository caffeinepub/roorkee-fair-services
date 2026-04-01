import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Review } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBookService() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      area,
      serviceName,
    }: {
      name: string;
      phone: string;
      area: string;
      serviceName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.bookService(name, phone, area, serviceName);
    },
  });
}

export function useSubmitReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      reviewerName,
      rating,
      comment,
      serviceName,
    }: {
      reviewerName: string;
      rating: bigint;
      comment: string;
      serviceName: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitReview(reviewerName, rating, comment, serviceName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      formId,
      name,
      email,
      message,
    }: {
      formId: string;
      name: string;
      email: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(formId, name, email, message);
    },
  });
}

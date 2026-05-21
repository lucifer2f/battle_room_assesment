import { create } from "zustand";


export const useRoomStore = create((set) => ({
  submissions: [],

  addSubmission: (submission) =>
    set((state) => ({
      submissions: [
        ...state.submissions,
        submission,
      ],
    })),

  updateSubmission: (id, data) =>
    set((state) => ({
      submissions: state.submissions.map((s) =>
        s.id === id
          ? { ...s, ...data }
          : s
      ),
    })),
}));
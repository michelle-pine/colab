export const projects = {
  1: {
    name: "Note-Taking App",
    creatorId: 1,
    description: "A web app that allows users to take notes and save the notes to the Cloud.",
    tags: [
      1, 7, 16, 38, 42, 69, 57, 74, 77
    ],
    state: "pending",
    createdAt: Date.now()
  },
  2: {
    name: "Food Ordering App",
    creatorId: 2,
    description: "A database & back-end made and required for a food ordering app.",
    tags: [
      28, 5, 60, 1, 3
    ],
    state: "pending",
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
  },
  3: {
    name: "Language Analyzer",
    creatorId: 3,
    description: "A desktop software which analyzes the speech patterns of inputted text.",
    tags: [
      6, 79, 78, 2, 66, 61, 58
    ],
    state: "pending",
    createdAt: Date.now() - 24 * 60 * 60 * 1000,
  }
}

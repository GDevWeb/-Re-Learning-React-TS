import { nanoid } from "nanoid";

interface EnumtodoItem {
  id: string;
  name: string;
  completed: boolean;
}

const todoArray: EnumtodoItem[] = [
  { id: nanoid(8), name: "Petit-déjeuner en famille", completed: false },
  { id: nanoid(8), name: "Session révision JS", completed: false },
  { id: nanoid(8), name: "Marche active", completed: false },
  { id: nanoid(8), name: "Déjeuner en famille", completed: false },
];

export default todoArray;

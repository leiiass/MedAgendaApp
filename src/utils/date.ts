import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const formatDate = (
  dateString: string | Date,
  formatString = "dd/MM/yyyy"
): string => {
  try {
    if (!dateString) return "--/--/----";
    return format(new Date(dateString), formatString, {
      locale: ptBR,
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export { formatDate };

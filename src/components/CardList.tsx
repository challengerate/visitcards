
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Eye } from "lucide-react";
import { CardFormData } from "@/types/card";

interface CardListProps {
  cards: any[];
  onEdit: (card: CardFormData) => void;
  onViewResponses: (cardId: string) => void;
}

export function CardList({ cards, onEdit, onViewResponses }: CardListProps) {
  function getInitials(name: string) {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <CardHeader className="bg-gray-50 border-b flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={card.profilePhoto as any} alt={card.fullName as any} />
              <AvatarFallback>{getInitials(card.fullName as any)}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-xl text-gray-900">
              {card.fullName as any}
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Job Title:</strong> {card.jobTitle as any|| "N/A"}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Company:</strong> {card.companyName as any|| "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Custom URL:</strong> {card.customName as any}
            </p>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t flex justify-between">
            <Button onClick={() => onEdit(card as CardFormData)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="outline"
              onClick={() => onViewResponses(card.id)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Responses
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
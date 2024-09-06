export interface AchievementInterface {
    achievementId: number;
    title: string;
    description: string;
    image: ImageInterface;
}

interface ImageInterface {
    url: string;
    createdAt: string;
    updatedAt: string;
}
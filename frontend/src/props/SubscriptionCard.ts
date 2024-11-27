export interface SubscriptionCardProps {
    topic: string;
    onUnsubscribe: (topic: string) => void;
}
import { Card, CardContent, CardHeader } from "./card";

const FeatureCard = ({ icon, title, description }: { icon: string; title: string; description: string }) => {
    return (
        <Card className="h-full flex flex-col justify-between gap-4 rounded-lg">
            <CardHeader>
                <div className={`w-10 h-10`}>
                    <img src={icon} alt={title} width="40" height="40" loading="lazy" />
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                    {description}
                </p>
            </CardContent>
        </Card>
    );
};

export default FeatureCard;
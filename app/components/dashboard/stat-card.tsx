"use client";

import { cn } from "@/app/lib/utils";



interface StatCardProps {
    label: string;
    value: string;
    subtext: string;
    color: string;
    className?: string;
}

export function StatCard({ label, value, subtext, color, className }: StatCardProps) {
    return (
        <div
            className={cn(
                "bg-card rounded-2xl p-5 border border-border relative overflow-hidden",
                "hover-lift card-interactive",
                className
            )}
        >
            {/* Subtle top accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
            />

            {/* Content */}
            <div className="relative z-10 pt-2">
                <div
                    className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-3"
                    style={{ backgroundColor: `${color}12`, color }}
                >
                    {label}
                </div>
                <div
                    className="text-3xl lg:text-4xl font-bold font-serif tracking-tight"
                    style={{ color }}
                >
                    {value}
                </div>
                <div className="text-xs text-muted-foreground mt-2 font-medium">
                    {subtext}
                </div>
            </div>

            {/* Decorative element */}
            <div
                className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full opacity-[0.06]"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}

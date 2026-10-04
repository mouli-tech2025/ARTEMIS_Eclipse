import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const teamMembers = [
    {
        id: 1,
        avatar: "/images/company/team/team-1.png",
        name: "James Whitaker",
        title: "Chief Executive Officer"
    },
    {
        id: 2,
        avatar: "/images/company/team/team-2.png",
        name: "Emily Rodriguez",
        title: "Design Lead"
    },
    {
        id: 3,
        avatar: "/images/company/team/team-3.png",
        name: "David Kim",
        title: "Marketing Director"
    },
    {
        id: 4,
        avatar: "/images/company/team/team-4.png",
        name: "Lisa Anderson",
        title: "Operations Manager"
    },
    {
        id: 5,
        avatar: "/images/company/team/team-5.png",
        name: "Robert Taylor",
        title: "Data Scientist"
    },
    {
        id: 6,
        avatar: "/images/company/team/team-6.png",
        name: "Maria Garcia",
        title: "UX Designer"
    },
    {
        id: 7,
        avatar: "/images/company/team/team-7.png",
        name: "John Williams",
        title: "Business Analyst"
    },
    {
        id: 8,
        avatar: "/images/company/team/team-8.png",
        name: "Jennifer Brown",
        title: "Sales Director"
    },
    {
        id: 9,
        avatar: "/images/company/team/team-9.png",
        name: "Christopher Lee",
        title: "Customer Success"
    },
    {
        id: 10,
        avatar: "/images/company/team/team-10.png",
        name: "Amanda White",
        title: "HR Director",
    },
    {
        id: 11,
        avatar: "/images/company/team/team-11.png",
        name: "Kevin Harris",
        title: "Software Engineer"
    },
    {
        id: 12,
        avatar: "/images/company/team/team-12.png",
        name: "Michelle Clark",
        title: "Product Manager"
    },
    {
        id: 13,
        avatar: "/images/company/team/team-13.png",
        name: "Brian Lewis",
        title: "UX Designer"
    },
    {
        id: 14,
        avatar: "/images/company/team/team-14.png",
        name: "Stephanie Walker",
        title: "Product Manager"
    },
    {
        id: 15,
        avatar: "/images/company/team/team-15.png",
        name: "Jason Hall",
        title: "Software Engineer"
    },
    {
        id: 16,
        avatar: "/images/company/team/team-16.png",
        name: "Lauren Allen",
        title: "Product Manager"
    },
    {
        id: 17,
        avatar: "/images/company/team/team-17.png",
        name: "Eric Young",
        title: "Software Engineer"
    },
    {
        id: 18,
        avatar: "/images/company/team/team-18.png",
        name: "Nicole Jackson",
        title: "Product Manager"
    },
    {
        id: 19,
        avatar: "/images/company/team/team-19.png",
        name: "Ryan Thompson",
        title: "Software Engineer"
    },
    {
        id: 20,
        avatar: "/images/company/team/team-20.png",
        name: "Ashley Moore",
        title: "Product Manager"
    },
    {
        id: 21,
        avatar: "/images/company/team/team-21.png",
        name: "Andrew Davis",
        title: "Software Engineer"
    },
    {
        id: 22,
        avatar: "/images/company/team/team-22.png",
        name: "Olivia Martinez",
        title: "Product Manager"
    },
    {
        id: 23,
        avatar: "/images/company/team/team-23.png",
        name: "William Lee",
        title: "Software Engineer"
    },
    {
        id: 24,
        avatar: "/images/company/team/team-24.png",
        name: "Sophia Chen",
        title: "Product Manager"
    },
    {
        id: 25,
        avatar: "/images/company/team/team-25.png",
        name: "James Brown",
        title: "Software Engineer"
    },
    {
        id: 26,
        avatar: "/images/company/team/team-26.png",
        name: "James Brown",
        title: "Software Engineer"
    },
    {
        id: 27,
        avatar: "/images/company/team/team-27.png",
        name: "James Brown",
        title: "Software Engineer"
    }
];

const TeamOverview = () => {

    const [hoveredMember, setHoveredMember] = useState<number | null>(null);
    const isMobile = useIsMobile();
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close tooltip on mobile devices
    useEffect(() => {
        if (!isMobile) return;

        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setHoveredMember(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isMobile]);

    // Show on click for mobile/tablet
    const handleMemberClick = (memberId: number) => {
        if (isMobile) {
            setHoveredMember(hoveredMember === memberId ? null : memberId);
        }
    };

    // Show on hover for desktop
    const handleMemberHover = (memberId: number) => {
        if (!isMobile) {
            setHoveredMember(memberId);
        }
    };

    const handleMemberLeave = () => {
        if (!isMobile) {
            setHoveredMember(null);
        }
    };

    // Tooltip component with smart positioning
    const Tooltip = ({ member, gridIndex }: { member: typeof teamMembers[0], gridIndex?: number }) => {
        const tooltipRef = useRef<HTMLDivElement>(null);
        const [position, setPosition] = useState<'left' | 'center' | 'right'>('center');

        useEffect(() => {
            if (!tooltipRef.current) return;

            // Use a small timeout to ensure the tooltip is rendered and positioned
            const timeoutId = setTimeout(() => {
                if (!tooltipRef.current) return;

                const tooltip = tooltipRef.current;
                const rect = tooltip.getBoundingClientRect();
                const viewportWidth = window.innerWidth;
                const padding = 16; // 1rem padding

                // Check if tooltip overflows on the left
                if (rect.left < padding) {
                    setPosition('left');
                }
                // Check if tooltip overflows on the right
                else if (rect.right > viewportWidth - padding) {
                    setPosition('right');
                }
                else {
                    setPosition('center');
                }
            }, 0);

            return () => clearTimeout(timeoutId);
        });

        const positionClasses = {
            left: 'left-0',
            center: 'left-1/2 -translate-x-1/2',
            right: 'right-0'
        };

        return (
            <div
                ref={tooltipRef}
                className={`absolute top-full ${positionClasses[position]} mt-3 z-30 w-48 bg-primary/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-in fade-in-0 slide-in-from-bottom-2 duration-200`}
            >
                <p className="text-white font-bold text-sm text-center mb-1">
                    {member.name}
                </p>
                <p className="text-white/90 text-xs text-center">
                    {member.title}
                </p>
            </div>
        );
    };

    return (
        <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
            <Container>
                <StaggerContainer className="text-center max-w-xl mx-auto">
                    <AnimateOnView blur>
                        <h2 className="h2 text-foreground mb-6">
                            Our experts powering global payments
                        </h2>
                    </AnimateOnView>

                    <AnimateOnView blur delay={0.1}>
                        <p className="mb-8">
                            Revio is built by a team of innovators, engineers, and entrepreneurs passionate about transforming the way businesses handle payments.
                        </p>
                    </AnimateOnView>

                    <AnimateOnView delay={0.2}>
                        <Button asChild className="bg-primary text-white hover:bg-primary/90">
                            <Link to="/contact">
                                Join Us Now
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </Button>
                    </AnimateOnView>
                </StaggerContainer>

                {/* Team Grid */}
                <div className="mt-16" ref={containerRef}>
                    <StaggerContainer className="space-y-4">
                        {/* Helper function to render team member */}
                        {(() => {
                            const renderMember = (member: typeof teamMembers[0], index: number, baseDelay: number, gridIndex?: number) => {
                                const isHovered = hoveredMember === member.id;

                                return (
                                    <div key={member.id} className="relative">
                                        <AnimateOnView
                                            delay={baseDelay + index * 0.02}
                                            className="aspect-square"
                                        >
                                            <div
                                                className={`w-full h-full rounded-sm md:rounded-[20px] overflow-hidden relative transition-all duration-300 cursor-pointer ${isHovered
                                                    ? 'scale-110 z-20 ring-2 ring-primary shadow-lg'
                                                    : hoveredMember !== null
                                                        ? 'blur-sm opacity-60 scale-95'
                                                        : 'group'
                                                    }`}
                                                onMouseEnter={() => handleMemberHover(member.id)}
                                                onMouseLeave={handleMemberLeave}
                                                onClick={() => handleMemberClick(member.id)}
                                            >
                                                <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center text-neutral-500 text-xs">
                                                    Team {member.id}
                                                </div>
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />
                                            </div>
                                        </AnimateOnView>
                                        {/* Info Tooltip */}
                                        {isHovered && (
                                            <Tooltip member={member} gridIndex={gridIndex} />
                                        )}
                                    </div>
                                );
                            };

                            // Use all 27 members
                            const displayMembers = teamMembers;
                            const itemsPerRow = 12;

                            // First row: 3 members, 6 empty spaces (3-8), member at 9, empty at 10, member at 11 (total 5 members)
                            const firstRowMembers = displayMembers.slice(0, 5);
                            const remainingMembers = displayMembers.slice(5);

                            // Split remaining members into rows of 12
                            const rows: (typeof teamMembers)[] = [];
                            for (let i = 0; i < remainingMembers.length; i += itemsPerRow) {
                                rows.push(remainingMembers.slice(i, i + itemsPerRow));
                            }

                            return (
                                <>
                                    {/* First row */}
                                    {/* grid-cols-6 for < 1024px, lg:grid-cols-12 for > 1024px */}
                                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4">
                                        {firstRowMembers.slice(0, 3).map((member, index) =>
                                            renderMember(member, index, 0.05, index)
                                        )}
                                        {/* Empty items */}
                                        {Array.from({ length: 6 }).map((_, index) => (
                                            <div key={`empty-${index}`}></div>
                                        ))}
                                        {/* Member at index 9 */}
                                        {firstRowMembers.slice(3, 4).map((member, index) =>
                                            renderMember(member, 9, 0.05, 9)
                                        )}
                                        {/* Empty at index 10 */}
                                        <div key="empty-10"></div>
                                        {/* Member at index 11 */}
                                        {firstRowMembers.slice(4, 5).map((member, index) =>
                                            renderMember(member, 11, 0.05, 11)
                                        )}
                                    </div>

                                    {/* Other rows */}
                                    {rows.map((row, rowIndex) => {
                                        const isRow3 = rowIndex === 1; // Row 3 (second row after first row)

                                        if (isRow3) {
                                            // Row 3: empty at indices 1 and 7
                                            let memberIndex = 0;
                                            return (
                                                <div key={rowIndex + 1} className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4">
                                                    {Array.from({ length: 12 }).map((_, gridIndex) => {
                                                        if (gridIndex === 1 || gridIndex === 7) {
                                                            return <div key={`empty-${gridIndex}`}></div>;
                                                        }
                                                        if (memberIndex < row.length) {
                                                            const member = row[memberIndex];
                                                            memberIndex++;
                                                            return renderMember(member, gridIndex, 0.05 + (rowIndex + 1) * 0.15, gridIndex);
                                                        }
                                                        return <div key={`empty-${gridIndex}`}></div>;
                                                    })}
                                                </div>
                                            );
                                        }

                                        // Normal rows
                                        // On mobile/tablet (grid-cols-6), the 12 items will automatically wrap:
                                        // 6 items on line 1, 6 items on line 2.
                                        return (
                                            <div key={rowIndex + 1} className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-4">
                                                {row.map((member, index) =>
                                                    renderMember(member, index, 0.05 + (rowIndex + 1) * 0.15, index)
                                                )}
                                            </div>
                                        );
                                    })}
                                </>
                            );
                        })()}
                    </StaggerContainer>
                </div>
            </Container>
        </section>
    );
};

export default TeamOverview;
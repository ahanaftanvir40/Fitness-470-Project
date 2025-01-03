import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Assuming you have a Dialog component.

function Blogs() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    const blogPosts = [
        {
            id: 1,
            title: "10 Essential Exercises for a Full Body Workout",
            excerpt: "Discover the key exercises that target all major muscle groups for an effective full-body workout routine.",
            author: "Jane Doe",
            date: "2023-06-15",
            readTime: "5 min read",
            imageUrl: "https://img.freepik.com/free-photo/man-working-out-gym_23-2148197777.jpg",
            category: "Strength Training"
        },
        {
            id: 2,
            title: "The Ultimate Guide to Meal Prepping for Fitness Success",
            excerpt: "Learn how to efficiently plan and prepare your meals to support your fitness goals and save time.",
            author: "John Smith",
            date: "2023-06-10",
            readTime: "8 min read",
            imageUrl: "https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg",
            category: "Nutrition"
        },
        {
            id: 3,
            title: "5 Yoga Poses to Improve Flexibility and Reduce Stress",
            excerpt: "Incorporate these simple yoga poses into your routine to enhance flexibility and manage stress levels.",
            author: "Emily Chen",
            date: "2023-06-05",
            readTime: "6 min read",
            imageUrl: "https://img.freepik.com/free-vector/silhouette-female-yoga-pose-against-mandala-design_1048-13082.jpg",
            category: "Yoga"
        },
        {
            id: 4,
            title: "High-Intensity Interval Training: Maximize Results in Minimal Time",
            excerpt: "Explore the benefits of HIIT workouts and how to incorporate them into your fitness routine for efficient fat burning.",
            author: "Mike Johnson",
            date: "2023-05-30",
            readTime: "7 min read",
            imageUrl: "https://img.freepik.com/free-photo/woman-man-treadmills_1262-408.jpg",
            category: "Cardio"
        },
        {
            id: 5,
            title: "The Importance of Rest and Recovery in Your Fitness Journey",
            excerpt: "Understand why rest days are crucial for muscle growth, injury prevention, and overall fitness progress.",
            author: "Sarah Thompson",
            date: "2023-05-25",
            readTime: "4 min read",
            imageUrl: "https://img.freepik.com/free-vector/early-morning-concept-illustration_114360-7352.jpg",
            category: "Recovery"
        }
    ];

    const featuredPost = blogPosts[0];
    const recentPosts = blogPosts.slice(1);

    const openModal = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    };

    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* Featured Post */}
                <FeaturedPost post={featuredPost} />

                {/* Recent Posts */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {recentPosts.map((post) => (
                            <BlogPostCard key={post.id} post={post} openModal={openModal} />
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {selectedPost && (
                <Dialog open={isModalOpen} onOpenChange={closeModal}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedPost.title}</DialogTitle>
                        </DialogHeader>
                        <div>
                            <img
                                src={selectedPost.imageUrl}
                                alt={selectedPost.title}
                                className="w-full h-64 object-cover mb-4 rounded-lg"
                            />
                            <Badge variant="secondary" className="mb-4">{selectedPost.category}</Badge>
                            <p className="mb-4 text-gray-600">{selectedPost.excerpt}</p>
                            <p className="text-gray-800">{`By ${selectedPost.author} on ${selectedPost.date}`}</p>
                            <p className="text-gray-800 mt-2">{`Read Time: ${selectedPost.readTime}`}</p>
                        </div>
                        <Button onClick={closeModal} variant="outline" className="mt-6">Close</Button>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

export default Blogs;

function FeaturedPost({ post }) {
    return (
        <Card className="w-full">
            <CardContent className="p-0">
                <div className="md:flex">
                    <div className="md:flex-shrink-0">
                        <img className="h-48 w-full object-cover md:w-48" src={post.imageUrl} alt={post.title} />
                    </div>
                    <div className="p-8">
                        <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                        <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                        <CardDescription className="mt-2">{post.excerpt}</CardDescription>
                        <div className="mt-4 flex items-center">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${post.author}`} alt={post.author} />
                                <AvatarFallback>{post.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                <div className="flex space-x-1 text-sm text-gray-500">
                                    <span>{post.date}</span>
                                    <span aria-hidden="true">&middot;</span>
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function BlogPostCard({ post, openModal }) {
    return (
        <Card>
            <CardHeader className="p-0">
                <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
            </CardHeader>
            <CardContent className="p-4">
                <Badge variant="secondary" className="mb-2">{post.category}</Badge>
                <CardTitle className="text-lg">{post.title}</CardTitle>
                <CardDescription className="mt-2 line-clamp-2">{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center">
                        <ClockIcon className="mr-1 h-4 w-4" />
                        <span>{post.readTime}</span>
                    </div>
                </div>
                <Button onClick={() => openModal(post)} variant="outline" size="sm">Read More</Button>
            </CardFooter>
        </Card>
    );
}

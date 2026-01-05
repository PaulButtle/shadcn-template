/**
 * Blog Page
 * 
 * Blog listing page showcasing articles and insights.
 * Features featured posts, category filters, and a newsletter signup.
 * 
 * @component
 */

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  ArrowRight,
  Newspaper,
  Search
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Blog post data structure */
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  featured?: boolean;
}

/** Blog categories */
const CATEGORIES = [
  "All",
  "Engineering",
  "Design",
  "Product",
  "Company",
  "Tutorials",
];

/** Sample blog posts */
const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Introducing Our New Component Library",
    excerpt: "We're excited to announce the release of our comprehensive component library, featuring over 50 beautifully designed, accessible components built with React and Tailwind CSS.",
    category: "Product",
    author: {
      name: "Sophie Chen",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    },
    publishedAt: "28/12/2025",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: "2",
    title: "Building Scalable Systems with TypeScript",
    excerpt: "Learn how we leverage TypeScript's type system to build robust, maintainable applications that scale with our growing team and codebase.",
    category: "Engineering",
    author: {
      name: "Marcus Thompson",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    publishedAt: "21/12/2025",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
  },
  {
    id: "3",
    title: "Design Systems: A Complete Guide",
    excerpt: "Discover how to create and maintain a cohesive design system that ensures consistency across your entire product ecosystem.",
    category: "Design",
    author: {
      name: "Emma Richardson",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=EmmaR",
    },
    publishedAt: "15/12/2025",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
  },
  {
    id: "4",
    title: "Our Journey to £15M Series A",
    excerpt: "A behind-the-scenes look at our fundraising journey, the lessons we learned, and what it means for the future of our company.",
    category: "Company",
    author: {
      name: "Alexandra Wright",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra",
    },
    publishedAt: "08/12/2025",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop",
  },
  {
    id: "5",
    title: "Getting Started with Next.js 15",
    excerpt: "A comprehensive tutorial on setting up your first Next.js 15 project with TypeScript, Tailwind CSS, and all the modern tooling you need.",
    category: "Tutorials",
    author: {
      name: "Daniel Okonkwo",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Daniel",
    },
    publishedAt: "01/12/2025",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop",
  },
  {
    id: "6",
    title: "The Art of Accessible Design",
    excerpt: "Why accessibility matters and how we bake it into every component we build, ensuring our products work for everyone.",
    category: "Design",
    author: {
      name: "Sophie Chen",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    },
    publishedAt: "24/11/2025",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&h=600&fit=crop",
  },
];

/** Featured post (first in the list) */
const featuredPost = BLOG_POSTS.find((post) => post.featured);

/** Regular posts (excluding featured) */
const regularPosts = BLOG_POSTS.filter((post) => !post.featured);

/**
 * Blog page component displaying articles and insights
 */
export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-orange-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.1),transparent_50%)]" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6">
              <Newspaper className="w-3 h-3 mr-1" />
              Blog
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Insights, stories &{" "}
              <span className="text-amber-500">ideas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              Discover the latest articles on engineering, design, product development, 
              and company culture from our team.
            </p>
            
            {/* Search bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10 h-12 bg-background/50 border-border/50"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="py-6 border-y border-border bg-muted/30">
        <Container>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "shrink-0",
                  category === "All" && "bg-amber-500 hover:bg-amber-600 text-white"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 lg:py-20">
          <Container>
            <div className="mb-8">
              <Badge variant="outline" className="mb-2">
                <BookOpen className="w-3 h-3 mr-1" />
                Featured Article
              </Badge>
            </div>
            
            <Link href={`/blog/${featuredPost.id}`}>
              <Card className="group overflow-hidden border-border/50 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                <div className="grid lg:grid-cols-2">
                  <div className="aspect-video lg:aspect-auto relative overflow-hidden">
                    <Image
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:hidden" />
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <Badge variant="secondary" className="w-fit mb-4 bg-amber-500/10 text-amber-600">
                      {featuredPost.category}
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-amber-500 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={featuredPost.author.avatarUrl}
                            alt={featuredPost.author.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{featuredPost.author.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {featuredPost.publishedAt}
                            <span>•</span>
                            <Clock className="w-3 h-3" />
                            {featuredPost.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Container>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <Button variant="ghost" className="text-amber-500 hover:text-amber-600">
              View all
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <Card className="group h-full overflow-hidden border-border/50 hover:border-amber-500/30 transition-all hover:-translate-y-1">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 bg-amber-500/10 text-amber-600">
                      {post.category}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-amber-500 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                        <Image
                          src={post.author.avatarUrl}
                          alt={post.author.name}
                          width={32}
                          height={32}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{post.author.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.publishedAt}</span>
                          <span>•</span>
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 lg:py-28">
        <Container>
          <Card className="bg-gradient-to-br from-amber-500/10 via-background to-orange-500/10 border-amber-500/20">
            <CardContent className="p-8 lg:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <Badge variant="secondary" className="mb-4 bg-amber-500/10 text-amber-600">
                  Newsletter
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Stay in the loop
                </h2>
                <p className="text-muted-foreground mb-8">
                  Get the latest articles, tutorials, and product updates delivered straight to your inbox. 
                  No spam, unsubscribe anytime.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="h-12 bg-background/50"
                  />
                  <Button className="h-12 px-8 bg-amber-500 hover:bg-amber-600 text-white">
                    Subscribe
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      <Separator />
    </div>
  );
}


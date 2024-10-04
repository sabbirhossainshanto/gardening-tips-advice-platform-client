"use client";
import { Avatar, Button, Card, CardHeader, CardBody } from "@nextui-org/react";

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full container-box">
        {/* Hero Section */}
        <div
          style={{
            position: "relative",
            backgroundImage:
              "url('https://www.gardenia.net/wp-content/uploads/2023/02/shutterstock_170315264Optimized-1.jpg')",
            backgroundSize: "cover",
            padding: "80px 20px",
            textAlign: "center",
            borderRadius: "4px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
          <h1 className="text-gray-900 font-medium text-base">
            Nurturing Growth Together!
          </h1>
          <h3 className="text-gray-900 font-medium text-base">
            A platform built for gardeners, by gardeners.
          </h3>
          <Button size="lg" color="primary" style={{ marginTop: "20px" }}>
            Join the Community
          </Button>
        </div>

        {/* Mission Statement Section */}
        <div className="lg:flex items-center justify-between gap-4 mt-20">
          <div>
            <img
              src="https://www.drewandjonathan.com/wp-content/uploads/2024/03/gardening-tips-for-beginners.jpg"
              alt="Community Gardening"
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </div>
          <div className="space-y-10 mt-20 lg:mt-0">
            <div className="text-center">
              <h1 className="font-semibold text-xl">Our Mission</h1>
              <h1>
                We aim to provide gardening enthusiasts with a space to learn,
                share, and inspire each other through valuable tips, techniques,
                and seasonal guides. Our goal is to foster a global gardening
                community that thrives together.
              </h1>
            </div>
            {/* Platform Story Section */}
            <div className="text-center">
              <h1 className="font-semibold text-xl">Our Story</h1>
              <h1>
                We started with a simple idea—to bring gardeners together in a
                single platform where they can share knowledge and experience.
                Over time, we’ve grown into a thriving community of gardening
                enthusiasts from all walks of life.
              </h1>
            </div>
            {/* Vision Section */}
            <div className="text-center">
              <h1 className="font-semibold text-xl">Looking Ahead</h1>
              <div title="Future Plans">
                <h1>
                  Our platform aims to introduce more interactive features such
                  as real-time garden monitoring, plant disease identification,
                  and more gardening tools. Stay tuned for exciting updates!
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* The Team Section */}

        <div className="mt-20">
          <h1 className="text-center py-6 font-semibold text-xl">
            Meet the Team
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Card>
                <CardHeader>
                  <Avatar src="https://www.drewandjonathan.com/wp-content/uploads/2024/03/gardening-tips-for-beginners.jpg" />
                  <h1 className="ml-3">Sarah Greenfield</h1>
                </CardHeader>
                <CardBody>
                  <h1>
                    Sarah is a passionate horticulturist with over 10 years of
                    experience in sustainable gardening. She loves sharing her
                    knowledge about organic gardening practices and has a knack
                    for growing herbs and vegetables in small urban spaces. When
                    she’s not in the garden, you can find her volunteering at
                    local community gardens.
                  </h1>
                </CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <Avatar src="https://www.drewandjonathan.com/wp-content/uploads/2024/03/gardening-tips-for-beginners.jpg" />
                  <h1 className="ml-3">Tom Rivers</h1>
                </CardHeader>
                <CardBody>
                  <h1>
                    Tom is an avid gardener and landscape designer who believes
                    in the healing power of nature. With a background in
                    environmental science, he specializes in creating
                    eco-friendly garden designs that promote biodiversity. His
                    mission is to inspire others to connect with nature through
                    gardening.
                  </h1>
                </CardBody>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <Avatar src="https://www.drewandjonathan.com/wp-content/uploads/2024/03/gardening-tips-for-beginners.jpg" />
                  <h1 className="ml-3">Emily Blooms</h1>
                </CardHeader>
                <CardBody>
                  <h1>
                    Emily is a freelance writer and plant enthusiast who enjoys
                    exploring various gardening techniques and trends. She has
                    contributed articles to several gardening magazines and
                    loves sharing tips on container gardening and indoor plants.
                    In her free time, she enjoys visiting botanical gardens and
                    learning about rare plant species.
                  </h1>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

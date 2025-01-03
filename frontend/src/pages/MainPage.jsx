import { useUserContext } from "../../context/userContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import fitnessImg from '../assets/fitnessImg.jpg'
import tipsImg from '../assets/tipsImg.jpg'
import { User, Activity, Ruler, Weight } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import ChatBot from "@/components/ChatBot";

export default function MainPage() {
  const { user, isLoading, setUser } = useUserContext();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    dietPlan: '',
  });

  const [tips, setTips] = useState([]);
  const [currentTip, setCurrentTip] = useState('')
  const [show, setShow] = useState(false);



  //fetch tips
  useEffect(() => {
    try {
      const fetchTips = async () => {
        const response = await axios.get("http://localhost:3000/api/healthtips/getTips");
        setTips(response.data.SendTips);
        console.log("ACTUAL TIPS: ", response.data.SendTips);

      }
      fetchTips();
    } catch (error) {
      toast.error("Error fetching health tips");
      console.log("Error fetching health tips:", error);

    }
  }, [])
  console.log("Tips:", tips);

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setCurrentTip(randomTip);
  }, [tips]);



  //BMI BMR
  const calculateBMI = (height, weight) => {
    return (weight / ((height / 100) ** 2)).toFixed(2);
  };

  const calculateBMR = (height, weight, age, gender) => {
    if (gender === 'male') {
      return (88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)).toFixed(2);
    } else {
      return (447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age)).toFixed(2);
    }
  };

  function getBMICategory(bmi) {
    if (bmi < 18.5) return "Underweight"
    if (bmi < 25) return "Normal weight"
    if (bmi < 30) return "Overweight"
    return "Obese"
  }

  const bmiCategory = user && user.bmi ? getBMICategory(user.bmi) : "Unknown";
  const bmiProgress = user && user.bmi ? (user.bmi / 30) * 100 : 0;

  useEffect(() => {
    if (user) {
      setFormData({
        height: user.height,
        weight: user.weight,
        dietPlan: user.dietPlan,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const bmi = calculateBMI(formData.height, formData.weight);
      const bmr = calculateBMR(formData.height, formData.weight, user.age, user.gender);

      const updatedData = {
        ...formData,
        bmi,
        bmr,
      };
      const response = await axios.post("http://localhost:3000/api/user/updateUser", updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      console.log("Update successful:", response.data);
      toast.success("User data updated successfully");
      setUser(response.data.user); // Update the user context with the new data
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!user) {
    return <div>No user data available</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex min-h-screen py-10">
        <aside className="w-80 ml-4 rounded-3xl bg-gradient-to-b from-black/90 to-black/70 shadow-xl p-8 text-white">
          <Card className="bg-transparent border-none text-white">
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-32 h-32 border-4 border-white/10">
                  <AvatarImage src='https://github.com/shadcn.png' alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback>{user.firstName}{user.lastName}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span className="font-semibold">BMI:</span>
                  </div>
                  <span>{user.bmi.toFixed(1)}</span>
                </div>
                <Progress value={bmiProgress} className="h-2" />
                <p className="text-sm text-center">{bmiCategory}</p>
              </div>

              <Separator className="bg-white/20" />

              <div className="space-y-4">
                <StatItem icon={Activity} label="BMR" value={`${user.bmr.toFixed(0)} kcal`} />
                <StatItem icon={Ruler} label="Height" value={`${user.height} cm`} />
                <StatItem icon={Weight} label="Weight" value={`${user.weight} kg`} />
              </div>
            </CardContent>
          </Card>
        </aside>

        <main className="flex-1 p-10">
          <h1 className="text-xl font-light text-white/80 bg-pink-600 w-fit p-2 mx-auto rounded-lg mb-6 border-8 border-pink-500 ">Welcome {user.firstName}</h1>
          <div className="flex gap-6 ">
            {user.dietPlan && (
              <div className="py-4 w-fit">
                <div className="card bg-base-100 image-full w-[360px] h-64 shadow-xl">
                  <figure>
                    <img
                      className=" object-cover"
                      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                      alt="Shoes" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-white">Fitness Goal</h2>
                    {user.dietPlan === 'weight_gain' ? (
                      <p className="text-white/80">Your current goal is to <span className="font-bold text-white">gain weight</span> We know you can do it!</p>
                    ) : (
                      <p>Your current goal is to <span className="font-bold text-white">lose weight</span> We know you can do it!</p>
                    )}

                    <div className="card-actions justify-end">
                      <Link to="/roadmap">
                        <button className="btn btn-primary text-white">Roadmap</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}


            <div className="py-4 w-fit">
              <div className="card bg-base-100 image-full w-[360px] h-64 shadow-xl">
                <figure>
                  <img
                    className=" object-c"
                    src={fitnessImg}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white">Health Status</h2>
                  {user.bmi < 18.5 ? (
                    <p className="text-white/80">You should <span className="font-bold text-white">gain some weight</span> according to your BMI Choose your diet plan now!</p>
                  ) : (
                    <p className="text-white/80">You should <span className="font-bold text-white">lose some weight</span> according to your <span className="font-bold text-white">BMI</span> Choose your diet plan now!</p>
                  )}


                </div>
              </div>
            </div>

            <div className="py-4 w-fit">
              <div className="card bg-base-100 image-full w-[360px] h-64 shadow-xl">
                <figure>
                  <img
                    className=" object-c"
                    src={tipsImg}
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white">Daily Health Tips!</h2>
                  <p className="text-white">{currentTip}</p>
                </div>
              </div>
            </div>

            <div className="py-4 w-fit">
              <div className="card bg-base-100 image-full w-[360px] h-64 shadow-xl">
                <figure>
                  <img
                    className=" object-c"
                    src='https://img.freepik.com/free-photo/after-gym-is-time-little-chat_329181-11231.jpg'
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white">Fitness Blogs</h2>
                  <p className="text-white">Stay updated with the latest trends, tips, and advice on fitness and health.</p>
                  <div className="card-actions justify-end">
                    <Link to="/blog">
                      <button className="btn btn-primary text-white">View Blogs</button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">

            <Card>
              <CardHeader>
                <CardTitle>Update Measurements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Choose Your Diet Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={formData.dietPlan} onValueChange={(value) => setFormData((prevData) => ({ ...prevData, dietPlan: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="weight_gain">Weight Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <motion.div
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={handleUpdate} className="w-full">
              Save Changes
            </Button>
          </motion.div>




        </main>

        <motion.div
          className="fixed bottom-10 left-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button onClick={() => setShow(!show)} className="bg-blue-600 hover:bg-blue-500 text-white rounded-full p-10 shadow-lg">
            Chat With AI Trainer
          </Button>
        </motion.div>

        {show && (
          <ChatBot />
        )}

      </div>


    </div >
  );
}

function StatItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span className="font-semibold">{label}:</span>
      </div>
      <span>{value}</span>
    </div>
  )
}
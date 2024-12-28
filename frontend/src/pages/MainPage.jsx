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

export default function MainPage() {
  const { user, isLoading, setUser } = useUserContext();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    dietPlan: '',
  });




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
      <div className="flex min-h-screen py-20 ">
        {/* Sidebar */}
        <aside className="w-64 ml-4  rounded-3xl bg-black/80 shadow-md p-10 text-white flex justify-center">

          <div className=" space-y-1 flex flex-col justify-center items-center">
            <Avatar className='w-24 h-24'>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-4 flex flex-col items-center">

              <p className="text-xl"> {user.firstName} {user.lastName}</p>
              <p><span className="font-semibold">BMI:</span> {user.bmi}</p>
              <p><span className="font-semibold">BMR:</span> {user.bmr}</p>
              <p><span className="font-semibold">Height:</span> {user.height} cm</p>
              <p><span className="font-semibold">Weight:</span> {user.weight} kg</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-10">
          <h1 className="text-xl font-light text-white/80 bg-green-600 w-fit p-2 rounded-lg  ">Welcome {user.firstName}!</h1>
          {user.dietPlan === "weight_gain" && (
            <div className="py-4 w-fit">
              <div className="card bg-base-100 image-full w-96 shadow-xl">
                <figure>
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-white/80">Fitness Goal</h2>
                  <p>Your current goal is to <span className="font-bold text-white">gain weight</span> We know you can do it!</p>
                  <div className="card-actions justify-end">
                    <Link to="/roadmap">
                      <button className="btn btn-primary text-white">Roadmap</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

      </div>


    </div>
  );
}
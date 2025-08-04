import { FiTrash2 } from "react-icons/fi";
import { Container } from "../../components/container";
import { DashboardHeader } from "../../components/panelheader";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";
import { supabase } from "../../services/supabaseClient";
import toast from "react-hot-toast";
import { Link } from "react-router";

interface CarProps {
  id: string;
  name: string;
  year: string;
  price: string | number;
  city: string;
  km: string;
  images: ImageCarProps[];
  uid: string;
}

interface ImageCarProps {
  name: string;
  uid: string;
  url: string;
}

export function Dashboard() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    function loadCars() {
      if (!user?.uid) return;

      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));
      getDocs(queryRef)
        .then((snapshot) => {
          const listCars: CarProps[] = [];
          snapshot.forEach((doc) => {
            listCars.push({
              id: doc.id,
              name: doc.data().name,
              year: doc.data().year,
              km: doc.data().km,
              city: doc.data().city,
              price: doc.data().price,
              images: doc.data().images,
              uid: doc.data().uid,
            });
          });

          setCars(listCars);
        })
        .catch((error) => console.log(error));
    }

    loadCars();
  }, [user]);

  async function handleDeleteCar(deleteCar: CarProps) {
    const docRef = doc(db, "cars", deleteCar.id);
    try {
      await deleteDoc(docRef);

      // Deletar do storage - firebase
      /* 
      deleteCar.images.map( async (image) => {
        const imagePath = `images/${image.uid}/${image.name}`
        
        const imageRef = ref(storage, imagePath)
        try {
          await deleteObject(imageRef)
          setCars(cars.filter((car) => car.id !== deleteCar.id));
        } catch(err) {
          console.log("Erro ao excluir") 
        }
      })
        */

      // Deletar do storage - supabase
      deleteCar.images.map(async (image) => {
        const { error } = await supabase.storage
          .from("cars-images")
          .remove([`public/${image.uid}/${image.name}`]);

        if (error) {
          toast.error("Erro ao deletar anúncio");
          console.log("Erro", error);
        } else {
          console.log("imagem deletada");
        }
      });
      toast.success("Anúncio deletado com sucesso");
    } catch (e) {
      console.log("Erro ao deletar", e);
    }

    setCars(cars.filter((car) => car.id !== deleteCar.id));
  }

  return (
    <Container>
      <DashboardHeader />
      <h1 className="mb-6 mt-3 text-2xl font-bold text-center">
        {user?.name} - Dashboard
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link to={`/car/${car.id}`} key={car.id}>
            <section className="w-full bg-white rounded-lg relative">
              <button
                onClick={() => handleDeleteCar(car)}
                className="absolute bg-white w-14 h-14 rounded-full flex items-center justify-center right-2 top-2 drop-shadow"
              >
                <FiTrash2 size={26} color="#000" />
              </button>
              <img
                className="w-full rounded-lg mb-2 md:max-h-72 md:h-72"
                src={car.images[0].url}
                alt=""
              />
              <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>

              <div className="flex flex-col px-2">
                <span className="text-zinc-700">
                  Ano {car.year} | {car.km} km
                </span>
                <strong className="text-black font-bold mt-4">
                  R$ {car.price}
                </strong>
              </div>

              <div className="w-full h-px bg-slate-200 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-black">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </Container>
  );
}

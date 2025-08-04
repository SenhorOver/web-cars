import { useNavigate, useParams } from "react-router";
import { Container } from "../../components/container";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

import { Swiper, SwiperSlide } from "swiper/react";

interface CarProps {
  id: string;
  name: string;
  model: string;
  city: string;
  year: string;
  km: string;
  description: string;
  created: string;
  price: string | number;
  owner: string;
  uid: string;
  whatsapp: string;
  images: ImagesCarProps[];
}

interface ImagesCarProps {
  uid: string;
  name: string;
  url: string;
}

export function CarDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState<CarProps>();
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [sliderPerView, setSliderPerView] = useState<number>(2);

  useEffect(() => {
    async function loadCar() {
      if (!id) {
        return;
      }

      const docRef = doc(db, "cars", id);
      getDoc(docRef).then((snapshot) => {
        if (!snapshot.data()) {
          navigate("/");
          return;
        }

        setCar({
          id: snapshot.id,
          name: snapshot.data()?.name,
          year: snapshot.data()?.year,
          city: snapshot.data()?.city,
          model: snapshot.data()?.model,
          uid: snapshot.data()?.uid,
          description: snapshot.data()?.description,
          km: snapshot.data()?.km,
          created: snapshot.data()?.created,
          owner: snapshot.data()?.owner,
          price: snapshot.data()?.price,
          whatsapp: snapshot.data()?.whatsapp,
          images: snapshot.data()?.images,
        });
      });
    }
    loadCar();
  }, [id, navigate]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSliderPerView(1);
      } else {
        if (car?.images.length === 1) {
          setSliderPerView(1);
          return;
        }
        setSliderPerView(2);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [car?.images.length]);

  function handleImageLoad(id: string) {
    setImagesLoaded((images) => [...images, id]);
  }

  return (
    <Container>
      {car && (
        <Swiper
          slidesPerView={sliderPerView}
          pagination={{ clickable: true }}
          navigation
        >
          {car?.images.map((image) => (
            <SwiperSlide key={image.name}>
              <div
                className="w-full h-96 object-cover bg-slate-400 animate-pulse"
                style={{
                  display: imagesLoaded.includes(image.name) ? "none" : "block",
                }}
              ></div>
              <img
                src={image.url}
                className="w-full h-96 object-cover"
                alt="car image"
                style={{
                  display: imagesLoaded.includes(image.name) ? "block" : "none",
                }}
                onLoad={() => handleImageLoad(image.name)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {car && (
        <main className="w-full bg-white rounded-lg p-6 my-4">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
            <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
          </div>
          <p>{car?.model}</p>

          <div className="flex w-full gap-6 my-4">
            <div className="flex flex-col gap-4">
              <div>
                <p>Cidade:</p>
                <strong>{car?.city}</strong>
              </div>

              <div>
                <p>Ano:</p>
                <strong>{car?.year}</strong>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p>KM:</p>
                <strong>{car?.km}</strong>
              </div>
            </div>
          </div>

          <strong>Descrição: </strong>
          <p className="mb-4">{car?.description}</p>

          <strong>Telefone / WhatsApp</strong>
          <p>{car?.whatsapp}</p>

          <a
            className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium"
            href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá vi esse carro: "${car?.name}" no site WebCarros e fiquei interessado`}
            target="_blank"
            rel="noreferrer"
          >
            Conversar com vendedor
            <FaWhatsapp size={26} color="#FFF" />
          </a>
        </main>
      )}
    </Container>
  );
}

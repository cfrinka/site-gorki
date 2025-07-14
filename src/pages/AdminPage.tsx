import React, { useState, useEffect } from "react";
import FileUpload from "../components/FileUpload";
import { useSiteData } from "@/hooks/useSiteData";
import { useToast } from "@/hooks/use-toast";
import { DatePicker } from "@/components/ui/date-picker";

type BannerItem = {
  title: string;
  description: string;
  image: string;
};

type EventItem = {
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
};

type DecorationImage = {
  image: string;
  alt: string;
};

type Home = {
  banner: BannerItem[];
  nextEvents: EventItem[];
  decorationImages: DecorationImage;
};

type Course = {
  title: string;
  description: string;
  details: string;
  image: string;
};

type Catalog = {
  title: string;
  description: string;
  image: string;
};

type AboutUs = {
  description: string;
  image: string;
  alt: string;
};

type History = {
  title: string;
  description: string;
  alt: string;
  image: string;
};

type SiteData = {
  home: Home;
  courses: Course[];
  catalog: Catalog[];
  aboutUs: AboutUs[];
  history: History[];
  gallery: { src: string; alt: string }[];
};

const defaultSiteData: SiteData = {
  home: {
    banner: [],
    nextEvents: [],
    decorationImages: { image: "", alt: "" },
  },
  courses: [],
  catalog: [],
  aboutUs: [],
  history: [],
  gallery: [],
};

export default function AdminPage() {
  const { siteData: firebaseSiteData, loading, saveSiteDoc } = useSiteData();
  const { toast } = useToast();
  const [siteData, setSiteData] = useState<SiteData>(defaultSiteData);

  // Load data from Firebase when it's available
  useEffect(() => {
    if (firebaseSiteData && !loading) {
      // Ensure all required properties exist with fallbacks
      const safeSiteData: SiteData = {
        home: {
          banner: firebaseSiteData.home?.banner || [],
          nextEvents: firebaseSiteData.home?.nextEvents || [],
          decorationImages: firebaseSiteData.home?.decorationImages || {
            image: "",
            alt: "",
          },
        },
        courses: firebaseSiteData.courses || [],
        catalog: firebaseSiteData.catalog || [],
        aboutUs: firebaseSiteData.aboutUs || [],
        history: firebaseSiteData.history || [],
        gallery: firebaseSiteData.gallery || [],
      };
      setSiteData(safeSiteData);
    }
  }, [firebaseSiteData, loading]);

  // --- Home ---
  const handleHomeChange = <K extends keyof Home, V extends Home[K]>(
    key: K,
    value: V
  ) => {
    setSiteData((prev) => ({
      ...prev,
      home: {
        ...prev.home,
        [key]: value,
      },
    }));
  };

  // --- Courses ---
  const handleCourseChange = (
    idx: number,
    field: keyof Course,
    value: string
  ) => {
    setSiteData((prev) => {
      const courses = (prev.courses || []).map((c, i) =>
        i === idx ? { ...c, [field]: value } : c
      );
      return { ...prev, courses };
    });
  };
  const addCourse = () => {
    setSiteData((prev) => ({
      ...prev,
      courses: [
        ...(prev.courses || []),
        { title: "", description: "", details: "", image: "" },
      ],
    }));
  };
  const removeCourse = (idx: number) => {
    setSiteData((prev) => ({
      ...prev,
      courses: (prev.courses || []).filter((_, i) => i !== idx),
    }));
  };

  // --- Catalog ---
  const handleCatalogChange = (
    idx: number,
    field: keyof Catalog,
    value: string
  ) => {
    setSiteData((prev) => {
      const catalog = (prev.catalog || []).map((c, i) =>
        i === idx ? { ...c, [field]: value } : c
      );
      return { ...prev, catalog };
    });
  };
  const addCatalog = () => {
    setSiteData((prev) => ({
      ...prev,
      catalog: [
        ...(prev.catalog || []),
        { title: "", description: "", image: "" },
      ],
    }));
  };
  const removeCatalog = (idx: number) => {
    setSiteData((prev) => ({
      ...prev,
      catalog: (prev.catalog || []).filter((_, i) => i !== idx),
    }));
  };

  // --- Gallery ---
  const handleGalleryChange = (
    idx: number,
    field: keyof { src: string; alt: string },
    value: string
  ) => {
    setSiteData((prev) => {
      const gallery = (prev.gallery || []).map((g, i) =>
        i === idx ? { ...g, [field]: value } : g
      );
      return { ...prev, gallery };
    });
  };
  const addGallery = () => {
    setSiteData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), { src: "", alt: "" }],
    }));
  };
  const removeGallery = (idx: number) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: (prev.gallery || []).filter((_, i) => i !== idx),
    }));
  };

  // --- AboutUs ---
  const handleAboutUsChange = (
    idx: number,
    field: keyof AboutUs,
    value: string
  ) => {
    setSiteData((prev) => {
      const aboutUs = (prev.aboutUs || []).map((a, i) =>
        i === idx ? { ...a, [field]: value } : a
      );
      return { ...prev, aboutUs };
    });
  };
  const addAboutUs = () => {
    setSiteData((prev) => ({
      ...prev,
      aboutUs: [
        ...(prev.aboutUs || []),
        { description: "", image: "", alt: "" },
      ],
    }));
  };
  const removeAboutUs = (idx: number) => {
    setSiteData((prev) => ({
      ...prev,
      aboutUs: (prev.aboutUs || []).filter((_, i) => i !== idx),
    }));
  };

  // --- History ---
  const handleHistoryChange = (
    idx: number,
    field: keyof History,
    value: string
  ) => {
    setSiteData((prev) => {
      const history = (prev.history || []).map((h, i) =>
        i === idx ? { ...h, [field]: value } : h
      );
      return { ...prev, history };
    });
  };
  const addHistory = () => {
    setSiteData((prev) => ({
      ...prev,
      history: [
        ...(prev.history || []),
        { title: "", description: "", alt: "", image: "" },
      ],
    }));
  };
  const removeHistory = (idx: number) => {
    setSiteData((prev) => ({
      ...prev,
      history: (prev.history || []).filter((_, i) => i !== idx),
    }));
  };

  const handleSiteUpdate = async () => {
    try {
      await saveSiteDoc(siteData);
      toast({
        title: "Sucesso!",
        description: "Dados salvos com sucesso no Firebase.",
      });
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      toast({
        title: "Erro",
        description:
          "Erro ao salvar dados. Verifique o console para mais detalhes.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Carregando...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-6">Configurações do Site</h1>
      {/* Home Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Home</h2>
        <div className="mb-2">
          <label className="block font-medium">Imagem de Decoração</label>
          <FileUpload
            value={siteData.home?.decorationImages?.image || ""}
            onChange={(url) =>
              handleHomeChange("decorationImages", {
                ...(siteData.home?.decorationImages || { image: "", alt: "" }),
                image: url,
              })
            }
            folder="decorationImages"
            fileName={`decoration`}
          />
        </div>
        <div className="mb-2">
          <label className="block font-medium">
            Alt da Imagem de Decoração
          </label>
          <input
            className="border p-1 w-full"
            value={siteData.home?.decorationImages?.alt || ""}
            onChange={(e) =>
              handleHomeChange("decorationImages", {
                ...(siteData.home?.decorationImages || { image: "", alt: "" }),
                alt: e.target.value,
              })
            }
          />
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-1">Itens do Banner</h3>
          {(siteData.home?.banner || []).map((item, idx) => (
            <div
              key={idx}
              className="border rounded pt-10 p-2 mb-2 bg-gray-50 relative"
            >
              <button
                className="absolute top-2 right-2 mb-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
                title="Remover item do banner"
                onClick={() =>
                  handleHomeChange(
                    "banner",
                    (siteData.home?.banner || []).filter((_, i) => i !== idx)
                  )
                }
              >
                <span className="text-lg font-bold">&times;</span>
              </button>
              <input
                className="border p-1 w-full mb-1"
                placeholder="Título"
                value={item?.title || ""}
                onChange={(e) =>
                  handleHomeChange(
                    "banner",
                    (siteData.home?.banner || []).map((b, i) =>
                      i === idx ? { ...b, title: e.target.value } : b
                    )
                  )
                }
              />
              <input
                className="border p-1 w-full mb-1"
                placeholder="Descrição"
                value={item?.description || ""}
                onChange={(e) =>
                  handleHomeChange(
                    "banner",
                    (siteData.home?.banner || []).map((b, i) =>
                      i === idx ? { ...b, description: e.target.value } : b
                    )
                  )
                }
              />
              <FileUpload
                value={item?.image || ""}
                onChange={(url) =>
                  handleHomeChange(
                    "banner",
                    (siteData.home?.banner || []).map((b, i) =>
                      i === idx ? { ...b, image: url } : b
                    )
                  )
                }
                folder="banners"
                fileName={`banner-${idx}`}
              />
            </div>
          ))}
          <button
            className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
            onClick={() =>
              handleHomeChange("banner", [
                ...(siteData.home?.banner || []),
                { title: "", description: "", image: "" },
              ])
            }
          >
            Adicionar Item ao Banner
          </button>
        </div>
        <div>
          <h3 className="font-semibold mb-1">Próximos Eventos</h3>
          {(siteData.home?.nextEvents || [])
            .slice()
            .map((item, originalIdx) => ({ item, originalIdx }))
            .sort((a, b) => {
              const parse = (str: string) => {
                if (!str || str.trim() === "") return new Date(9999, 11, 31); // Put empty dates at the end
                const [d, m, y] = str.split("-").map(Number);
                if (isNaN(d) || isNaN(m) || isNaN(y))
                  return new Date(9999, 11, 31); // Invalid dates at the end
                return new Date(y, m - 1, d);
              };
              const dateA = parse(a.item.date);
              const dateB = parse(b.item.date);
              return dateA.getTime() - dateB.getTime();
            })
            .map(({ item, originalIdx }) => (
              <div
                key={originalIdx}
                className="border rounded pt-10 p-2 mb-2 bg-gray-50 relative"
              >
                <button
                  className="absolute top-2 right-2 mb-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
                  title="Remover evento"
                  onClick={() =>
                    handleHomeChange(
                      "nextEvents",
                      (siteData.home?.nextEvents || []).filter(
                        (_, i) => i !== originalIdx
                      )
                    )
                  }
                >
                  <span className="text-lg font-bold">&times;</span>
                </button>
                <input
                  className="border p-1 w-full mb-1"
                  placeholder="Título"
                  value={item?.title || ""}
                  onChange={(e) =>
                    handleHomeChange(
                      "nextEvents",
                      (siteData.home?.nextEvents || []).map((ev, i) =>
                        i === originalIdx
                          ? { ...ev, title: e.target.value }
                          : ev
                      )
                    )
                  }
                />
                <input
                  className="border p-1 w-full mb-1"
                  placeholder="Descrição"
                  value={item?.description || ""}
                  onChange={(e) =>
                    handleHomeChange(
                      "nextEvents",
                      (siteData.home?.nextEvents || []).map((ev, i) =>
                        i === originalIdx
                          ? { ...ev, description: e.target.value }
                          : ev
                      )
                    )
                  }
                />
                <DatePicker
                  value={item?.date || ""}
                  onChange={(date) =>
                    handleHomeChange(
                      "nextEvents",
                      (siteData.home?.nextEvents || []).map((ev, i) =>
                        i === originalIdx ? { ...ev, date: date } : ev
                      )
                    )
                  }
                  placeholder="Selecione a data do evento"
                  className="mb-1"
                />
                <input
                  className="border p-1 w-full mb-1"
                  placeholder="Local"
                  value={item?.location || ""}
                  onChange={(e) =>
                    handleHomeChange(
                      "nextEvents",
                      (siteData.home?.nextEvents || []).map((ev, i) =>
                        i === originalIdx
                          ? { ...ev, location: e.target.value }
                          : ev
                      )
                    )
                  }
                />
                <FileUpload
                  value={item?.image || ""}
                  onChange={(url) =>
                    handleHomeChange(
                      "nextEvents",
                      (siteData.home?.nextEvents || []).map((ev, i) =>
                        i === originalIdx ? { ...ev, image: url } : ev
                      )
                    )
                  }
                  folder="nextEvents"
                  fileName={`event-${originalIdx}`}
                />
              </div>
            ))}
          <button
            className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
            onClick={() =>
              handleHomeChange("nextEvents", [
                ...(siteData.home?.nextEvents || []),
                {
                  title: "",
                  description: "",
                  date: "",
                  location: "",
                  image: "",
                },
              ])
            }
          >
            Adicionar Evento
          </button>
        </div>
      </section>
      {/* Courses Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Cursos</h2>
        {(siteData.courses || []).map((course, idx) => (
          <div
            key={idx}
            className="border rounded pt-10 p-2 mb-2 bg-gray-50 relative"
          >
            <button
              className="absolute top-2 right-2 mb-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
              title="Remover curso"
              onClick={() => removeCourse(idx)}
            >
              <span className="text-lg font-bold">&times;</span>
            </button>
            <input
              className="border p-1 w-full mb-1"
              placeholder="Título"
              value={course?.title || ""}
              onChange={(e) => handleCourseChange(idx, "title", e.target.value)}
            />
            <input
              className="border p-1 w-full mb-1"
              placeholder="Descrição"
              value={course?.description || ""}
              onChange={(e) =>
                handleCourseChange(idx, "description", e.target.value)
              }
            />
            <input
              className="border p-1 w-full mb-1"
              placeholder="Detalhes"
              value={course?.details || ""}
              onChange={(e) =>
                handleCourseChange(idx, "details", e.target.value)
              }
            />
            <FileUpload
              value={course?.image || ""}
              onChange={(url) => handleCourseChange(idx, "image", url)}
              folder="courses"
              fileName={`course-${idx}`}
            />
          </div>
        ))}
        <button
          className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
          onClick={addCourse}
        >
          Adicionar Curso
        </button>
      </section>
      {/* Catalog Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Catálogo</h2>
        {(siteData.catalog || []).map((item, idx) => (
          <div
            key={idx}
            className="border rounded pt-10 p-2 mb-2 bg-gray-50 relative"
          >
            <button
              className="absolute top-2 right-2 mb-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
              title="Remover item do catálogo"
              onClick={() => removeCatalog(idx)}
            >
              <span className="text-lg font-bold">&times;</span>
            </button>
            <input
              className="border p-1 w-full mb-1"
              placeholder="Título"
              value={item?.title || ""}
              onChange={(e) =>
                handleCatalogChange(idx, "title", e.target.value)
              }
            />
            <input
              className="border p-1 w-full mb-1"
              placeholder="Descrição"
              value={item?.description || ""}
              onChange={(e) =>
                handleCatalogChange(idx, "description", e.target.value)
              }
            />
            <FileUpload
              value={item?.image || ""}
              onChange={(url) => handleCatalogChange(idx, "image", url)}
              folder="catalog"
              fileName={`catalog-${idx}`}
            />
          </div>
        ))}
        <button
          className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
          onClick={addCatalog}
        >
          Adicionar Item ao Catálogo
        </button>
      </section>
      {/* Gallery Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Galeria de Fotos</h2>
        {(siteData.gallery || []).map((item, idx) => (
          <div
            key={idx}
            className="border rounded pt-10 p-2 mb-2 bg-gray-50 relative"
          >
            <button
              className="absolute top-2 right-2 mb-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
              title="Remover foto da galeria"
              onClick={() =>
                setSiteData((prev) => ({
                  ...prev,
                  gallery: (prev.gallery || []).filter((_, i) => i !== idx),
                }))
              }
            >
              <span className="text-lg font-bold">&times;</span>
            </button>
            <FileUpload
              value={item?.src || ""}
              onChange={(url) =>
                setSiteData((prev) => ({
                  ...prev,
                  gallery: (prev.gallery || []).map((img, i) =>
                    i === idx ? { ...img, src: url } : img
                  ),
                }))
              }
              folder="gallery"
              fileName={`gallery-${idx}`}
            />
            <input
              className="border p-1 w-full mb-1"
              placeholder="Descrição (alt)"
              value={item?.alt || ""}
              onChange={(e) =>
                setSiteData((prev) => ({
                  ...prev,
                  gallery: (prev.gallery || []).map((img, i) =>
                    i === idx ? { ...img, alt: e.target.value } : img
                  ),
                }))
              }
            />
          </div>
        ))}
        <button
          className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
          onClick={() =>
            setSiteData((prev) => ({
              ...prev,
              gallery: [...(prev.gallery || []), { src: "", alt: "" }],
            }))
          }
        >
          Adicionar Foto à Galeria
        </button>
      </section>
      {/* About Us Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Sobre Nós</h2>
        {(siteData.aboutUs || []).map((item, idx) => (
          <div
            key={idx}
            className="border rounded pt-10 p-2 mb-2 bg-gray-50 relative"
          >
            <button
              className="absolute top-2 right-2 mb-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
              title="Remover sobre nós"
              onClick={() => removeAboutUs(idx)}
            >
              <span className="text-lg font-bold">&times;</span>
            </button>
            <input
              className="border p-1 w-full mb-1"
              placeholder="Descrição"
              value={item?.description || ""}
              onChange={(e) =>
                handleAboutUsChange(idx, "description", e.target.value)
              }
            />
            <FileUpload
              value={item?.image || ""}
              onChange={(url) => handleAboutUsChange(idx, "image", url)}
              folder="aboutUs"
              fileName={`aboutus-${idx}`}
            />
            <input
              className="border p-1 w-full mb-1"
              placeholder="Alt"
              value={item?.alt || ""}
              onChange={(e) => handleAboutUsChange(idx, "alt", e.target.value)}
            />
          </div>
        ))}
        <button
          className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
          onClick={addAboutUs}
        >
          Adicionar Sobre Nós
        </button>
      </section>
      {/* History Section */}
      <section className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">História</h2>
        {(siteData.history || []).map((item, idx) => (
          <div
            key={idx}
            className="border rounded pt-10 p-2 mb-2 bg-gray-50 relative"
          >
            <button
              className="absolute top-2 right-2 mb-2 text-white bg-red-500 hover:bg-red-700 rounded-full w-6 h-6 flex items-center justify-center shadow"
              title="Remover história"
              onClick={() => removeHistory(idx)}
            >
              <span className="text-lg font-bold">&times;</span>
            </button>
            <input
              className="border p-1 w-full mb-1"
              placeholder="Título"
              value={item?.title || ""}
              onChange={(e) =>
                handleHistoryChange(idx, "title", e.target.value)
              }
            />
            <input
              className="border p-1 w-full mb-1"
              placeholder="Descrição"
              value={item?.description || ""}
              onChange={(e) =>
                handleHistoryChange(idx, "description", e.target.value)
              }
            />
            <input
              className="border p-1 w-full mb-1"
              placeholder="Alt"
              value={item?.alt || ""}
              onChange={(e) => handleHistoryChange(idx, "alt", e.target.value)}
            />
            <FileUpload
              value={item?.image || ""}
              onChange={(url) => handleHistoryChange(idx, "image", url)}
              folder="history"
              fileName={`history-${idx}`}
            />
          </div>
        ))}
        <button
          className="mt-2 px-2 py-1 bg-green-600 text-white rounded"
          onClick={addHistory}
        >
          Adicionar Item à História
        </button>
      </section>
      {/* Save Button */}
      <div className="flex items-center justify-end w-full">
        <div
          className="px-6 py-3 bg-yellow-500 text-black rounded-2xl text-lg text-center font-bold shadow-lg hover:bg-yellow-600 transition-colors border-2 cursor-pointer"
          style={{ minWidth: "120px" }}
          onClick={handleSiteUpdate}
        >
          Salvar
        </div>
      </div>
    </div>
  );
}

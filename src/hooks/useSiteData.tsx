import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SITE_DOC_ID = "AuVrxhdOeARVt6kaWUfG";

export function useSiteData() {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSite() {
      try {
        const docRef = doc(db, "site", SITE_DOC_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSiteData({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          // If document doesn't exist, create it with default data
          const defaultData = {};
          await setDoc(docRef, defaultData);
          setSiteData({
            id: SITE_DOC_ID,
            ...defaultData,
          });
        }
      } catch (error) {
        console.error("Error fetching site data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSite();
  }, []);

  // Função para atualizar o documento na coleção 'site'
  async function saveSiteDoc(data: Record<string, unknown>) {
    try {
      await setDoc(doc(db, "site", SITE_DOC_ID), data, { merge: true });
      // Update local state after successful save
      setSiteData((prev) => ({
        id: SITE_DOC_ID,
        ...prev,
        ...data,
      }));
    } catch (error) {
      console.error("Error saving site data:", error);
      throw error;
    }
  }

  return { siteData, loading, saveSiteDoc };
}

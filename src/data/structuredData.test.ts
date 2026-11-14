import { describe, it, expect } from "vitest";
import { PERSON_ID, homeStructuredData } from "./structuredData";
import { socialLinks } from "./social";

describe("homeStructuredData", () => {
  const graph = homeStructuredData()["@graph"];
  const person = graph.find((node) => node["@type"] === "Person")!;
  const website = graph.find((node) => node["@type"] === "WebSite")!;

  it("Person 的 sameAs 只放個人檔案頁", () => {
    expect(person.sameAs).toEqual(
      socialLinks.filter((link) => link.isPersonalProfile).map((link) => link.url)
    );
    expect(person.sameAs).not.toContain("https://devherohub.com");
  });

  it("WebSite 以 @id 指向 Person", () => {
    expect(person["@id"]).toBe(PERSON_ID);
    expect(website.author).toEqual({ "@id": PERSON_ID });
  });
});

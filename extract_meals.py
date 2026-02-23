import fitz  # PyMuPDF
import sys

def main():
    doc = fitz.open('docs/guia_alimentar_populacao_brasileira_2ed.pdf')
    print(f"Total pages: {len(doc)}")
    
    # Let's search for "café da manhã", "almoço" and "jantar"
    found_meals = []
    
    # We know the examples are around chapter 3 or 4.
    for i in range(40, 80): # Usually meal examples are in this range
        page = doc[i]
        text = page.get_text()
        if "Café da manhã" in text or "Almoço" in text or "Jantar" in text:
            found_meals.append(f"--- PAGE {i} ---\n{text}")
            
    print("\n\n".join(found_meals[:3])) # limit output to first 3 pages with meals

if __name__ == '__main__':
    main()

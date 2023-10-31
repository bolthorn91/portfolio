import { useEffect, useRef } from 'react';

export const useScrollOffsets = (refLength = 8) => {
const refs = useRef(Array.from({length: refLength}))

  useEffect(() => {
    let _page = 1
    const recalculateHeight = (totalHeight, refElement, isChild) => {
        const pdfPageHeight = 1024
        const {offsetHeight, className} = refElement
        if (totalHeight + offsetHeight > pdfPageHeight * _page) {
          if (className === 'pdf-breakpoint') {
            const spaceToAdd = pdfPageHeight * _page - totalHeight;
            refElement.style.marginTop = `${spaceToAdd}px`
            _page += 1
            return totalHeight + spaceToAdd + offsetHeight;
          }
          if (refElement.childNodes.length >= 1) {
            return Array
              .from(refElement.childNodes)
              .reduce((acc, current) => recalculateHeight(acc, current), totalHeight);
          }
        }
        return totalHeight + offsetHeight;
      };

    const calculateRefsHeights = (_refs) => {
      return _refs.current.reduce((acc, refElement) => {
        return recalculateHeight(acc, refElement)
      }, 0)
    }

    calculateRefsHeights(refs)
  }, []);

  return refs;
}
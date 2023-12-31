export const detectTreeLevel = (label: string): {heading: string, description: string} => {
  console.log(label);
    switch (label.toLocaleLowerCase()) {
      case 'blister_blight':
        return {
          heading: 'Disease Detected',
          description: 'Blister Blight Detected!'
        }
      case 'bark_cancer':
        return {
          heading: 'Disease Detected',
          description: 'Branch Cancer Detected!'
        }
      case 'stem_cancer':
        return {
          heading: 'Disease Detected',
          description: 'Stem Cancer Detected!'
        }
      case 'healthy':
        return {
          heading: 'Normal',
          description: 'Tree is healthy!'
        }
      default:
        return {
          heading: 'Not Recognized',
          description: 'Please Scan an Image'
        }
    }
  }
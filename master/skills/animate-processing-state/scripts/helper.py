def generate_motion_variants(state_name):
    """
    Generate Framer Motion variant object string.
    """
    if state_name == "fade_slide":
        return """
const fadeSlide = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.2 }
}
"""
    if state_name == "draw_path":
        return """
const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { type: "spring", duration: 1.5, bounce: 0 } 
    }
  }
}
"""
    return "// Unknown variant"

if __name__ == "__main__":
    print(generate_motion_variants("draw_path"))

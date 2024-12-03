import Button from "./UI/Button";

const Footer = () => {
  return (
    <div className="flex justify-between">
      <div className="video-actions flex gap-3">
        <Button
          colorClasses="bg-accent diabled:bg-accentDark"
          label="Start Cropper"
        />
        <Button
          colorClasses="bg-accent diabled:bg-accentDark"
          label="Remove Cropper"
        />
        <Button
          colorClasses="bg-accent diabled:bg-accentDark"
          label="Generate Preview"
        />
      </div>
      <Button colorClasses="bg-secondary" label="Cancel" />
    </div>
  );
};

export default Footer;

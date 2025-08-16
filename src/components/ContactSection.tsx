import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Facebook, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  translations: any;
}

const ContactSection: React.FC<ContactSectionProps> = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    toast({
      title: translations.contact.form.success.title,
      description: translations.contact.form.success.message,
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/30123456789', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-mediterranean-blue mb-6">
            {translations.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-playfair text-mediterranean-blue">
                {translations.contact.form.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{translations.contact.form.name}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{translations.contact.form.email}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{translations.contact.form.phone}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{translations.contact.form.message}</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-mediterranean-blue hover:bg-aegean-blue text-white py-3 text-lg font-semibold"
                >
                  {translations.contact.form.send}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-playfair font-bold text-mediterranean-blue mb-6">
                  {translations.contact.info.title}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-mediterranean-blue/10 rounded-full flex items-center justify-center">
                      <Phone className="h-6 w-6 text-mediterranean-blue" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{translations.contact.info.phone}</h4>
                      <p className="text-muted-foreground mb-3">+30 123 456 789</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-mediterranean-blue hover:text-white transition-all duration-300 active:scale-[0.98]"
                        onClick={handleWhatsAppClick}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-mediterranean-blue/10 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-mediterranean-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{translations.contact.info.email}</h4>
                      <p className="text-muted-foreground">info@nowweland.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-mediterranean-blue/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-mediterranean-blue" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{translations.contact.info.location}</h4>
                      <p className="text-muted-foreground">Akrotiri, Chania, Crete, Greece</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-playfair font-bold text-mediterranean-blue mb-6">
                  {translations.contact.social.title}
                </h3>
                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 hover:bg-mediterranean-blue hover:text-white transition-all duration-300 active:scale-[0.98]"
                    onClick={() => window.open('https://facebook.com/nowweland', '_blank')}
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1 hover:bg-mediterranean-blue hover:text-white transition-all duration-300 active:scale-[0.98]"
                    onClick={() => window.open('https://instagram.com/nowweland', '_blank')}
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

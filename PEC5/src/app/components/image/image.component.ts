import { Component, OnInit } from '@angular/core';
import {ImagesService} from "../../services/images.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Image} from "../../models/image.interface";

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  image: Image;

  constructor(private imagesService:ImagesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier -->', identifier);

    this.imagesService.getImageById(identifier).subscribe((image) => {

      if (!image){
        return this.router.navigateByUrl('/');
      }

      this.image = image;
      console.log('Image -->', this.image)
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {ImagesService} from "../../services/images.service";
import {Image} from "../../models/image.interface";

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  images: Image[]= [];

  constructor(private imagesService: ImagesService) {
  }

  ngOnInit(): void {
    this.imagesService.getAllImages().subscribe((images) =>this.images = images);
  }
}
